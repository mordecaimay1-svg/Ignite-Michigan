export const LOGO = {
  path: "/logo.png",
  ogPath: "/logo.png",
} as const;

export const SITE = {
  name: "Ignite Michigan",
  tagline: "Connecting people who care about Michigan's future.",
  description:
    "Ignite Michigan builds a community of engaged citizens — educating, connecting, and mobilizing individuals around civic engagement and public policy.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://ignitemichigan.org",
  email: "ignite@ignite-michigan.org",
  goalYear: 2028,
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  movement: [
    { href: "/about", label: "Our Movement" },
    { href: "/about#founder", label: "Meet Our Founder" },
    { href: "/get-involved", label: "Take Action" },
  ],
  resources: [
    { href: "/events", label: "Upcoming Events" },
    { href: "/news", label: "News & Updates" },
    { href: "/portal", label: "Member Portal" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const VISION_GOALS = [
  {
    title: "Statewide Network",
    description:
      "Build a connected community of engaged citizens across every region of Michigan.",
    icon: "network" as const,
  },
  {
    title: "Educational Resources",
    description:
      "Equip communities with clear, accessible information on civic engagement and public policy.",
    icon: "book" as const,
  },
  {
    title: "Civic Participation",
    description:
      "Encourage greater involvement in local, county, and statewide civic life.",
    icon: "vote" as const,
  },
  {
    title: "Meaningful Connections",
    description:
      "Create lasting relationships between citizens, leaders, and communities that share a vision for Michigan.",
    icon: "heart" as const,
  },
] as const;

export const FOUNDER = {
  name: "David Lambright",
  title: "Founder, Ignite Michigan",
  credentials: "Certified John Maxwell Speaker, Trainer, and Coach",
  image: "/founder-david-lambright.jpg",
  storyHref: "/about#founder",
  bio: [
    "David Lambright has spent more than four decades developing leaders, mentoring young people, coaching athletes, and helping individuals discover their God-given purpose.",
    "As a Certified John Maxwell Speaker, Trainer, and Coach, David has dedicated his life to faith, leadership, and community impact.",
    "Today, he serves as Founder of Ignite Michigan — working to unite people who care about Michigan's future through education, civic engagement, and meaningful community connection.",
  ],
} as const;
