// Every project ("world") on the site. The orbit hero, the projects carousel and
// the /work/[slug] case-study pages all read from this one list.

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  company: string;
  /** Short label under the name, e.g. "EdTech · Full-stack" */
  tag: string;
  sector: string;
  /** e.g. "Live", "Pre-launch", "Internal tool" */
  status: string;
  subtitle: string;
  /** Planet colour */
  accent: string;
  summary: string;
  role: string;
  platform: string;
  stack: string[];
  did: string[];
  images: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "vikidemy-hub",
    company: "Vikidemy Hub",
    tag: "EdTech · Full-stack",
    sector: "EdTech",
    status: "Live",
    subtitle: "A learning platform parents can enrol and pay on, end to end",
    accent: "#00a87e",
    summary:
      "Vikidemy Hub helps parents enrol children in structured academic and digital-skills programmes. I built it end to end: multi-role dashboards for parents, students, educators and admins, payments in naira and dollars, automated session scheduling, renewal reminders and transactional email.",
    role: "Full-stack developer",
    platform: "Responsive web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Paystack", "Resend", "Zod", "Vercel"],
    did: [
      "Built the platform on the Next.js App Router with TypeScript and Tailwind CSS",
      "Set up sign-up, login and email verification with Supabase Auth",
      "Built enrolment flows for Online Classes, Reading Club and the Physical Learning Hub",
      "Integrated Paystack for payments in NGN and USD",
      "Automated renewal reminders with cron jobs and sent transactional email with Resend",
      "Built validated forms with React Hook Form and Zod, and embedded Calendly booking for parents",
    ],
    images: [
      { src: "/vikidemyhub1.png", alt: "Vikidemy Hub home page" },
      { src: "/vikidemyhub2.png", alt: "Vikidemy Hub programmes page" },
    ],
    liveUrl: "https://vikidemyhub.com",
    githubUrl: "https://github.com/Sarah-coder05/vikidemy_hub",
  },
  {
    slug: "velocity-digital",
    company: "Velocity Digital",
    tag: "Venture capital · Freelance",
    sector: "Venture capital",
    status: "Live",
    subtitle: "A CMS-powered website for an African venture fund",
    accent: "#ec7e00",
    summary:
      "Velocity Digital is an early-stage fund investing in African startups across trade, work and payments. I built their public website on a headless CMS so the team can publish insights, portfolio news and events without a developer, and moved an interactive data report from Vite into Next.js.",
    role: "Front-end developer (freelance)",
    platform: "Responsive web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi Cloud", "MUI", "Recharts"],
    did: [
      "Set up Strapi Cloud with custom Blog and Author collection types",
      "Built the Insights page with a featured post, category filters, search and load more",
      "Built the blog post page with reading time, author details, a sidebar and related posts",
      "Built the Portfolio page with filterable company cards, sticky category tabs and tap-to-reveal on mobile",
      "Migrated an interactive data report from Vite into the Next.js app",
      "Animated an SVG of three rotating rings around a static centre icon",
    ],
    images: [
      { src: "/velocityAfrica1.png", alt: "Velocity Digital home page" },
      { src: "/velocityAfrica2.png", alt: "Velocity Digital insights page" },
    ],
    liveUrl: "https://velocity.africa",
  },
  {
    slug: "edusproute",
    company: "Edusproute",
    tag: "EdTech · Frontend",
    sector: "EdTech",
    status: "Live",
    subtitle: "A job board and course platform for a tech-learning company",
    accent: "#494fdf",
    summary:
      "Edusproute trains people in tech skills and connects them with work. As their frontend developer I built a job board that matches job seekers with employers, the company's landing page, and tools that help educators and students organise course material and track progress.",
    role: "Frontend developer",
    platform: "Responsive web",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Postman"],
    did: [
      "Built and shipped a responsive job board where users search and apply for openings",
      "Designed and built the company landing page, accessible and mobile-first",
      "Integrated REST APIs for live content and data updates",
      "Tested and debugged APIs with Postman to keep front end and back end in sync",
      "Worked with designers and content teams to refine UI flows",
    ],
    images: [
      { src: "/edusproute1.png", alt: "Edusproute home page" },
      { src: "/edusproute2.png", alt: "Edusproute course page" },
    ],
    liveUrl: "https://edusproute.com",
  },
  {
    slug: "swipas",
    company: "Swipas",
    tag: "Marketplace · Full-stack",
    sector: "Marketplace",
    status: "Pre-launch",
    subtitle: "Swipe-to-buy secondhand deals that disappear in 24 hours",
    accent: "#e61e49",
    summary:
      "Swipas is a secondhand marketplace for people nearby. Every listing expires after 24 hours, so deals move fast. Buyers swipe through items around them, make offers and meet sellers at a public spot. I built the app and its waitlist site, including sign-up and login, the payment flow and the Supabase backend behind them.",
    role: "Full-stack developer",
    platform: "Mobile app, landing page",
    stack: ["Next.js", "TypeScript", "Supabase", "Supabase Auth"],
    did: [
      "Built sign-up and login with Supabase Auth",
      "Built the payment flow",
      "Built the swipe feed: right to save, left to pass, up to make an offer",
      "Added a 24-hour countdown to every listing, with distance and seller trust signals",
      "Built the offer, chat and public-meetup flow, with safety prompts, reporting and blocking",
      "Built the waitlist landing page",
    ],
    images: [{ src: "/projects/swipas-hero.jpg", alt: "Swipas landing page with the app's swipe feed" }],
  },
  {
    slug: "jacs-farms",
    company: "JACS Farms",
    tag: "AgriTech · Full-stack",
    sector: "AgriTech",
    status: "Internal tool",
    subtitle: "An admin dashboard for running a livestock operation",
    accent: "#428619",
    summary:
      "JACS Farms works with farmers across Nigeria. Their admin dashboard gives staff one place to track every animal, the store, field reports and farm insights, while field agents report in from a mobile app. I built the admin pages on Supabase, from login and role-based access to the data behind every screen.",
    role: "Full-stack developer",
    platform: "Web admin, field-agent app",
    stack: ["Next.js", "TypeScript", "Supabase", "Supabase Auth", "Role-based access"],
    did: [
      "Built the admin pages and their data on Supabase",
      "Built one-time-code login by email or phone, with Super admin approval for new accounts",
      "Built the animal registry with vaccine schedules, sick-watch flags, bulk upload and CSV export",
      "Built store inventory for feeds, medication and assets, with inflow and outflow history",
      "Built daily reports and chat with field agents, plus hatchery records and a vet directory",
      "Handled offline use: edits save on the device and sync when the connection returns",
    ],
    images: [
      { src: "/projects/jacs-overview.jpg", alt: "JACS Farms dashboard overview" },
      { src: "/projects/jacs-registry.jpg", alt: "JACS Farms animal registry" },
      { src: "/projects/jacs-inventory.jpg", alt: "JACS Farms store inventory" },
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
