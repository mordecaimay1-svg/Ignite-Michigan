export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "member" | "leader" | "admin";
export type EventType = "in_person" | "zoom" | "hybrid";
export type EventStatus = "draft" | "published" | "cancelled";
export type PostStatus = "draft" | "published" | "archived";
export type VolunteerType = "general" | "leadership" | "prayer" | "county_rep";
export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface Database {
  public: {
    Tables: {
      counties: {
        Row: {
          id: string;
          name: string;
          fips_code: string | null;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          fips_code?: string | null;
          slug: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["counties"]["Insert"]>;
        Relationships: [];
      };
      chapters: {
        Row: {
          id: string;
          name: string;
          slug: string;
          county_id: string | null;
          leader_id: string | null;
          description: string | null;
          member_count: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          county_id?: string | null;
          leader_id?: string | null;
          description?: string | null;
          member_count?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chapters"]["Insert"]>;
        Relationships: [];
      };
      member_profiles: {
        Row: {
          id: string;
          user_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          county: string | null;
          county_id: string | null;
          chapter_id: string | null;
          role: UserRole;
          referral_code: string;
          referred_by: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          county?: string | null;
          county_id?: string | null;
          chapter_id?: string | null;
          role?: UserRole;
          referral_code: string;
          referred_by?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["member_profiles"]["Insert"]>;
        Relationships: [];
      };
      referrals: {
        Row: {
          id: string;
          referrer_id: string;
          referred_id: string;
          level: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          referrer_id: string;
          referred_id: string;
          level?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["referrals"]["Insert"]>;
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          author_id: string | null;
          category_id: string | null;
          status: PostStatus;
          is_featured: boolean;
          seo_title: string | null;
          seo_description: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image?: string | null;
          author_id?: string | null;
          category_id?: string | null;
          status?: PostStatus;
          is_featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          event_type: EventType;
          status: EventStatus;
          location: string | null;
          zoom_url: string | null;
          starts_at: string;
          ends_at: string | null;
          capacity: number | null;
          category: string | null;
          cover_image: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          event_type?: EventType;
          status?: EventStatus;
          location?: string | null;
          zoom_url?: string | null;
          starts_at: string;
          ends_at?: string | null;
          capacity?: number | null;
          category?: string | null;
          cover_image?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string | null;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id?: string | null;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["event_registrations"]["Insert"]>;
        Relationships: [];
      };
      volunteer_applications: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          county: string;
          type: VolunteerType;
          message: string | null;
          status: ApplicationStatus;
          user_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          county: string;
          type?: VolunteerType;
          message?: string | null;
          status?: ApplicationStatus;
          user_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["volunteer_applications"]["Insert"]>;
        Relationships: [];
      };
      newsletters: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          county: string | null;
          is_active: boolean;
          subscribed_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          first_name?: string | null;
          county?: string | null;
          is_active?: boolean;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["newsletters"]["Insert"]>;
        Relationships: [];
      };
      prayer_requests: {
        Row: {
          id: string;
          user_id: string | null;
          request: string;
          is_anonymous: boolean;
          is_answered: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          request: string;
          is_anonymous?: boolean;
          is_answered?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["prayer_requests"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      user_role: UserRole;
      event_type: EventType;
      event_status: EventStatus;
      post_status: PostStatus;
      volunteer_type: VolunteerType;
      application_status: ApplicationStatus;
    };
  };
}

export type County = Database["public"]["Tables"]["counties"]["Row"];
export type Chapter = Database["public"]["Tables"]["chapters"]["Row"];
export type MemberProfile = Database["public"]["Tables"]["member_profiles"]["Row"];
export type Event = Database["public"]["Tables"]["events"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
