/**
 * Confirmed Youth+ Festival speakers - portraits live under
 * `public/images/Speakers Images/` (filenames must match the repo exactly).
 */

export type FestivalSpeaker = {
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  connectHref: string;
  connectCta: string;
  /** Optional `object-position` so portraits can sit lower in the frame (e.g. `center 78%`). */
  portraitObjectPosition?: string;
};

const SPEAKERS_SUBDIR = "Speakers Images";

function speakerImage(fileName: string): string {
  return `/images/${encodeURIComponent(SPEAKERS_SUBDIR)}/${encodeURIComponent(fileName)}`;
}

function introMailto(name: string): string {
  const subject = `Youth+ Festival - connect me with ${name}`;
  return `mailto:partners@youthplusafrica.com?subject=${encodeURIComponent(subject)}`;
}

export const FESTIVAL_SPEAKERS: FestivalSpeaker[] = [
  {
    name: "Amonge Sinxoto",
    title: "Author",
    company: "Social entrepreneur",
    bio: "Builds narrative and community around youth leadership and social impact.",
    image: speakerImage("Amonge Sinxoto- Author,Social entrepreneur.jpeg"),
    connectHref: introMailto("Amonge Sinxoto"),
    connectCta: "Connect",
  },
  {
    name: "Amos Ngau",
    title: "Finance coach",
    company: "Youth+ Festival",
    bio: "Helps founders and professionals build practical money systems and clarity.",
    image: speakerImage("Amos Ngau - Finance Coach.jpg"),
    connectHref: introMailto("Amos Ngau"),
    connectCta: "Connect",
  },
  {
    name: "Coach Wangui",
    title: "Self-sabotage coach",
    company: "Youth+ Festival",
    bio: "Works on mindset patterns that block performance, revenue, and follow-through.",
    image: speakerImage("Coach Wangui- Self Sabotage Coach.jpeg"),
    connectHref: introMailto("Coach Wangui"),
    connectCta: "Connect",
  },
  {
    name: "Daisy Khaindi",
    title: "Founder",
    company: "Covo Care",
    bio: "Builds solutions at the intersection of care, community, and sustainable impact.",
    image: speakerImage("Daisy Khaindi- Founder Covo Care.jpeg"),
    connectHref: introMailto("Daisy Khaindi"),
    connectCta: "Connect",
  },
  {
    name: "Imelda Mugambi",
    title: "Communications expert",
    company: "Youth+ Festival",
    bio: "Shapes clear brand and stakeholder messaging for high-stakes moments.",
    image: speakerImage("Imelda Mugambi-Communications Expert.jpeg"),
    connectHref: introMailto("Imelda Mugambi"),
    connectCta: "Connect",
  },
  {
    name: "Jackline Mutuma",
    title: "Sales vice president",
    company: "fxpesa",
    bio: "Leads growth motion for trading and financial services audiences across markets.",
    image: speakerImage("Jackline Mutuma - Sales Vice President ,fxpesa.jpg"),
    connectHref: introMailto("Jackline Mutuma"),
    connectCta: "Connect",
  },
  {
    name: "Jesse Ogola",
    title: "Sales vice president",
    company: "fxpesa",
    bio: "Drives revenue partnerships and disciplined execution in competitive markets.",
    image: speakerImage("Jesse Ogola - Sales Vice President,fxpesa.jpg"),
    connectHref: introMailto("Jesse Ogola"),
    connectCta: "Connect",
  },
  {
    name: "Linda Makatiani",
    title: "Family finance coach & founder",
    company: "Finance4Families",
    bio: "Equips households with tools to plan, save, and invest with confidence.",
    image: speakerImage(
      "Linda Makatiani is a Family Finance Coach and Founder of Finance4Families.jpg",
    ),
    connectHref: introMailto("Linda Makatiani"),
    connectCta: "Connect",
  },
  {
    name: "Lorrain Atieno",
    title: "Founder",
    company: "Beyond the Savannah",
    bio: "Champions journeys that expand what young Africans believe is possible.",
    image: speakerImage("Lorrain Atieno- Founder Beyond the savanahh.jpeg"),
    connectHref: introMailto("Lorrain Atieno"),
    connectCta: "Connect",
  },
  {
    name: "Makena Wirimu",
    title: "Legal expert",
    company: "Youth+ Festival",
    bio: "Translates compliance and contracts into decisions founders can act on quickly.",
    image: speakerImage("Makena Wirimu - Legal Expert.jpeg"),
    portraitObjectPosition: "center top",
    connectHref: introMailto("Makena Wirimu"),
    connectCta: "Connect",
  },
  {
    name: "Maryanne Wairimu",
    title: "Youth+ speaker",
    company: "Youth+ Festival",
    bio: "Joining the festival programme - full session details to be announced.",
    image: speakerImage("Maryanne Wairimu.jpeg"),
    portraitObjectPosition: "center top",
    connectHref: introMailto("Maryanne Wairimu"),
    connectCta: "Connect",
  },
  {
    name: "Mitchelle Jangara",
    title: "AI-powered content strategist",
    company: "Youth+ Festival",
    bio: "Designs content systems that scale quality without losing brand voice.",
    image: speakerImage("Mitchelle Jangara- AI Powered Content Strategist.jpeg"),
    portraitObjectPosition: "center top",
    connectHref: introMailto("Mitchelle Jangara"),
    connectCta: "Connect",
  },
  {
    name: "Mumbi Kamau",
    title: "Personal development coach",
    company: "Youth+ Festival",
    bio: "Helps leaders build habits, confidence, and resilience under real pressure.",
    image: speakerImage("Mumbi Kamau- Personal Development Coach.jpeg"),
    connectHref: introMailto("Mumbi Kamau"),
    connectCta: "Connect",
  },
  {
    name: "Nehemia Kabugi",
    title: "Finance manager",
    company: "HEVA Fund",
    bio: "Brings fund-level financial rigour and portfolio insight to founder conversations.",
    image: speakerImage("Nehemia Kabugi, Finance Manager at HEVA Fund.jpg"),
    connectHref: introMailto("Nehemia Kabugi"),
    connectCta: "Connect",
  },
  {
    name: "Purity Kibe",
    title: "Financial literacy expert",
    company: "Youth+ Festival",
    bio: "Makes finance approachable for first-time earners and growing businesses.",
    image: speakerImage("Purity Kibe- Financial Litracy Expert.jpeg"),
    connectHref: introMailto("Purity Kibe"),
    connectCta: "Connect",
  },
  {
    name: "Quinta Ontiti",
    title: "Inclusive finance leader",
    company: "Youth+ Festival",
    bio: "Advances products and programmes that widen access to opportunity.",
    image: speakerImage("Quinta Ontiti-Inclusive Finance Leader.jpeg"),
    connectHref: introMailto("Quinta Ontiti"),
    connectCta: "Connect",
  },
  {
    name: "Robert Mbogo",
    title: "Markets educator",
    company: "Youth+ Festival",
    bio: "Breaks down markets and risk so participants leave with usable frameworks.",
    image: speakerImage("Robert Mbogo - Markets Educator.jpg"),
    connectHref: introMailto("Robert Mbogo"),
    connectCta: "Connect",
  },
  {
    name: "Rufas Kamau",
    title: "Regional market analyst",
    company: "Youth+ Festival",
    bio: "Connects macro signals to decisions operators make on pricing and expansion.",
    image: speakerImage("Rufas Kamau - Regional Market Analyst.jpg"),
    connectHref: introMailto("Rufas Kamau"),
    connectCta: "Connect",
  },
  {
    name: "Shi Kangethe",
    title: "AI strategist",
    company: "Youth+ Festival",
    bio: "Helps teams prioritise AI use-cases that ship and create measurable value.",
    image: speakerImage("Shi Kangethe- AI Strategist.jpeg"),
    connectHref: introMailto("Shi Kangethe"),
    connectCta: "Connect",
  },
  {
    name: "Victoria Nyanzi",
    title: "Brand strategist",
    company: "Youth+ Festival",
    bio: "Builds positioning and story systems that travel across channels and markets.",
    image: speakerImage("Victoria Nyanzi- Brand strategist.jpeg"),
    connectHref: introMailto("Victoria Nyanzi"),
    connectCta: "Connect",
  },
];
