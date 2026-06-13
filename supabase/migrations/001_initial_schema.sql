-- Ignite Michigan — Initial Schema
-- Run in Supabase SQL Editor or via CLI: supabase db push

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('member', 'leader', 'admin');
CREATE TYPE event_type AS ENUM ('in_person', 'zoom', 'hybrid');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled');
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE volunteer_type AS ENUM ('general', 'leadership', 'prayer', 'county_rep');
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');

-- Counties (Michigan)
CREATE TABLE counties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  fips_code TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Chapters
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  county_id UUID REFERENCES counties(id) ON DELETE SET NULL,
  leader_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  description TEXT,
  member_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chapters_county ON chapters(county_id);
CREATE INDEX idx_chapters_slug ON chapters(slug);

-- Member profiles (extends auth.users)
CREATE TABLE member_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  county TEXT,
  county_id UUID REFERENCES counties(id) ON DELETE SET NULL,
  chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
  role user_role NOT NULL DEFAULT 'member',
  referral_code TEXT NOT NULL UNIQUE,
  referred_by UUID REFERENCES member_profiles(id) ON DELETE SET NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_member_profiles_user ON member_profiles(user_id);
CREATE INDEX idx_member_profiles_referral ON member_profiles(referral_code);
CREATE INDEX idx_member_profiles_referred_by ON member_profiles(referred_by);
CREATE INDEX idx_member_profiles_role ON member_profiles(role);

-- Referrals tracking
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES member_profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES member_profiles(id) ON DELETE CASCADE,
  level INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);

-- Categories (blog)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id UUID REFERENCES member_profiles(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status post_status NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured) WHERE is_featured = true;

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  event_type event_type NOT NULL DEFAULT 'zoom',
  status event_status NOT NULL DEFAULT 'draft',
  location TEXT,
  zoom_url TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  capacity INTEGER,
  category TEXT,
  cover_image TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_starts ON events(starts_at);
CREATE INDEX idx_events_status ON events(status);

-- Event registrations
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, email)
);

CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);

-- Volunteer applications
CREATE TABLE volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  county TEXT NOT NULL,
  type volunteer_type NOT NULL DEFAULT 'general',
  message TEXT,
  status application_status NOT NULL DEFAULT 'pending',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_volunteer_email ON volunteer_applications(email);
CREATE INDEX idx_volunteer_status ON volunteer_applications(status);

-- Newsletter subscribers
CREATE TABLE newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  county TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_newsletters_email ON newsletters(email);

-- Prayer requests
CREATE TABLE prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  request TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  is_answered BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER member_profiles_updated_at
  BEFORE UPDATE ON member_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER chapters_updated_at
  BEFORE UPDATE ON chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  code TEXT;
BEGIN
  code := UPPER(SUBSTRING(REPLACE(NEW.id::TEXT, '-', '') FROM 1 FOR 8));
  INSERT INTO member_profiles (user_id, first_name, last_name, email, referral_code)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Member'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    code
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Row Level Security
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE counties ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read published events" ON events
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read counties" ON counties FOR SELECT USING (true);
CREATE POLICY "Public read active chapters" ON chapters
  FOR SELECT USING (is_active = true);

-- Member policies
CREATE POLICY "Users read own profile" ON member_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users update own profile" ON member_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users read own referrals" ON referrals
  FOR SELECT USING (
    referrer_id IN (SELECT id FROM member_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users read own registrations" ON event_registrations
  FOR SELECT USING (auth.uid() = user_id OR email = auth.jwt()->>'email');

-- Insert policies
CREATE POLICY "Anyone can RSVP events" ON event_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can subscribe newsletter" ON newsletters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can apply volunteer" ON volunteer_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated prayer requests" ON prayer_requests
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users read own prayers" ON prayer_requests
  FOR SELECT USING (auth.uid() = user_id);

-- Admin helper
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM member_profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE POLICY "Admin full member_profiles" ON member_profiles
  FOR ALL USING (is_admin());

CREATE POLICY "Admin manage events" ON events
  FOR ALL USING (is_admin());

CREATE POLICY "Admin manage posts" ON blog_posts
  FOR ALL USING (is_admin());

CREATE POLICY "Admin view applications" ON volunteer_applications
  FOR SELECT USING (is_admin());

CREATE POLICY "Admin view newsletters" ON newsletters
  FOR SELECT USING (is_admin());

CREATE POLICY "Admin view prayers" ON prayer_requests
  FOR SELECT USING (is_admin());

-- Seed Michigan counties (sample — extend to all 83)
INSERT INTO counties (name, slug, fips_code) VALUES
  ('Wayne', 'wayne', '26163'),
  ('Oakland', 'oakland', '26125'),
  ('Macomb', 'macomb', '26099'),
  ('Kent', 'kent', '26081'),
  ('Genesee', 'genesee', '26049'),
  ('Washtenaw', 'washtenaw', '26161'),
  ('Ingham', 'ingham', '26065'),
  ('Ottawa', 'ottawa', '26139'),
  ('Kalamazoo', 'kalamazoo', '26077'),
  ('Livingston', 'livingston', '26093')
ON CONFLICT (slug) DO NOTHING;

-- Sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Movement Updates', 'movement-updates', 'News from Ignite Michigan leadership'),
  ('Civic Engagement', 'civic-engagement', 'Guides for political and cultural action'),
  ('Faith & Culture', 'faith-culture', 'Biblical perspective on public life')
ON CONFLICT (slug) DO NOTHING;
