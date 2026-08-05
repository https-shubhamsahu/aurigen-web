/**
 * About page content module.
 * Swap photo paths, bios, and copy here without touching layout components.
 *
 * Photos are optimized copies from aurigen-gallery/ served under public/about/
 * and public/gallery/.
 */

export type AboutImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Aspect hint for layout: "hero" | "portrait" | "landscape" | "square" */
  aspect?: "hero" | "portrait" | "landscape" | "square";
  /** CSS object-position for face-centered crops */
  objectPosition?: string;
};

export type FounderProfile = {
  name: string;
  role: string;
  /** Short introduction / bio. */
  intro: string;
  areasOfFocus: string[];
  portrait: AboutImage;
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
    instagram?: string;
    x?: string;
  };
};

export type TimelineEvent = {
  year: string;
  title: string;
  body: string;
};

export type StackImage = {
  id: string;
  src: string;
  alt: string;
};

export const aboutHero = {
  headline: "We didn't start in a boardroom.",
  support:
    "Aurigen began inside a college robotics laboratory. There, AI, robotics, and systems work forged engineers and builders who ship intelligent machines.",
  image: {
    src: "/about/hero.jpg",
    alt: "Students gathered around a line-following robotics competition track in a bright hall",
    caption: "Robotics competition · Trailblazers",
    aspect: "hero" as const,
    objectPosition: "center 45%",
  },
  primaryCta: { label: "Apply", href: "/#contact" },
  secondaryCta: { label: "See our work", href: "/#projects" },
};

/** Answer-first entity block for AEO. About page only. */
export const aboutWhat = {
  title: "What is Aurigen?",
  answer:
    "Aurigen is an engineering institution that forges builders of intelligent machines.",
  body: [
    "We train AI engineers, robotics innovators, researchers, and founders through labs, mentors, and systems that ship.",
    "Aurigen is not an EdTech product company. It is an institution built on craft standards, real hardware, and people who invent with intelligent machines.",
  ],
};

export const aboutWhy = {
  eyebrow: "Purpose",
  title: "Why does Aurigen exist?",
  lines: [
    "Education produces consumers.",
    "Engineering produces builders.",
    "AI changes software.",
    "Robotics changes the physical world.",
    "Aurigen exists because intelligent machines should be built, not merely discussed.",
  ],
};

export const aboutLab = {
  eyebrow: "The lab",
  headline: "Real engineering happened here.",
  support:
    "Robots. Electronics. Soldering. Whiteboards. ESP32 boards. PCBs. Loose components. Broken prototypes. Debugging. Notebooks. The workbench.",
  photos: [
    {
      src: "/about/lab-01.jpg",
      alt: "ESP32 board wired to a breadboard with glowing LEDs and a relay module on a workbench",
      caption: "Electronics",
      aspect: "portrait" as const,
      objectPosition: "center center",
    },
    {
      src: "/about/lab-02.jpg",
      alt: "Handmade robot chassis with exposed wiring and lithium batteries on a wooden bench",
      caption: "Prototype",
      aspect: "portrait" as const,
      objectPosition: "center center",
    },
    {
      src: "/about/lab-03.jpg",
      alt: "Close-up of a wheeled robot with dense multi-colored wiring on a workshop table",
      caption: "Wiring",
      aspect: "landscape" as const,
      objectPosition: "center center",
    },
    {
      src: "/about/lab-04.jpg",
      alt: "Two red DIY robot chassis held over a lab floor, showing ESP32 boards and ultrasonic sensors",
      caption: "Robots",
      aspect: "portrait" as const,
      objectPosition: "center center",
    },
    {
      src: "/about/lab-05.jpg",
      alt: "Clear acrylic line-follower robot with Arduino Nano, motor driver, and sensor bar",
      caption: "Line follower",
      aspect: "landscape" as const,
      objectPosition: "center center",
    },
    {
      src: "/about/lab-06.jpg",
      alt: "Purple 3D-printed robotic plotter with stepper motors and a green control board",
      caption: "Plotter",
      aspect: "square" as const,
      objectPosition: "center center",
    },
  ] satisfies AboutImage[],
  /** Documentary stack featured in The Lab */
  stack: [
    {
      id: "mecanum",
      src: "/gallery/stack-01.jpg",
      alt: "Infineon mobile robot with Mecanum wheels and LED strips on a lab floor",
    },
    {
      id: "esp32",
      src: "/gallery/stack-02.jpg",
      alt: "Live ESP32 breadboard build with jumper wires and a glowing relay",
    },
    {
      id: "bench-bot",
      src: "/gallery/stack-03.jpg",
      alt: "Open robot prototype with pink battery cells on a scratched wooden workbench",
    },
    {
      id: "debug",
      src: "/gallery/stack-04.jpg",
      alt: "Students huddled around a laptop debugging electronics beside jumper wires and notebooks",
    },
    {
      id: "red-bots",
      src: "/gallery/stack-05.jpg",
      alt: "Two red competition robots held for inspection, batteries and motor drivers visible",
    },
    {
      id: "wire-detail",
      src: "/gallery/stack-06.jpg",
      alt: "Four-wheeled robot chassis with exposed signal wiring during a workshop session",
    },
  ] satisfies StackImage[],
};

export const aboutPeople = {
  title: "The People Behind Aurigen",
  support:
    "Aurigen began with a small group of people who believed that engineering should be learned by building. Every prototype, workshop, and late night debugging session shaped what Aurigen has become today.",
};

export const aboutFounders: FounderProfile[] = [
  {
    name: "Shubham Sahu",
    role: "Co-Founder",
    intro:
      "Shubham Sahu co-founded Aurigen with the belief that engineering is learned through making. His work spans artificial intelligence, robotics, embedded systems, and product engineering. He is committed to building an institution where future engineers develop the confidence to design, build, and ship technology that matters.",
    areasOfFocus: [
      "Artificial Intelligence",
      "Robotics",
      "Embedded Systems",
      "Product Engineering",
      "Open Source",
    ],
    portrait: {
      src: "/about/founder-shubham.jpg",
      alt: "Portrait of Shubham Sahu, co-founder of Aurigen",
      aspect: "portrait",
      objectPosition: "center 18%",
    },
    links: {
      github: "https://github.com/https-shubhamsahu",
      linkedin: "https://www.linkedin.com/in/shubhamsahu9372",
      email: "mailto:shubhamsahu@aurigen.tech",
      x: "https://x.com/Isagi0011",
      instagram: "https://www.instagram.com/https.shubham.sahu",
    },
  },
  {
    name: "Neel Bhogle",
    role: "Co-Founder",
    intro:
      "Neel Bhogle co-founded Aurigen with the belief that education should teach students how to think, not simply what to think. His interests lie at the intersection of artificial intelligence, robotics, and learning design. Through Aurigen, he is helping create an environment where curiosity becomes engineering and ideas become real-world solutions.",
    areasOfFocus: [
      "Artificial Intelligence",
      "Robotics",
      "Learning Design",
      "Product Strategy",
      "Innovation",
    ],
    portrait: {
      src: "/about/founder-neel.jpg",
      alt: "Portrait of Neel Bhogle, co-founder of Aurigen",
      aspect: "portrait",
      objectPosition: "center 20%",
    },
    links: {
      linkedin: "https://www.linkedin.com/in/neel-bhogle-590075338",
      email: "mailto:neelbhogle@aurigen.tech",
      instagram: "https://www.instagram.com/neel.still",
    },
  },
];

export const aboutAcknowledgement = {
  title: "With Gratitude",
  name: "Prof. Rita Vora",
  roles: [
    "Assistant Professor, Department of Electronics & Computer Engineering",
    "Robotics & Automation Club Incharge",
  ],
  body: [
    "Every serious engineering path begins because someone chooses to believe in students before the results exist.",
    "Aurigen is grateful to Prof. Rita Vora, Assistant Professor in the Department of Electronics & Computer Engineering at Thakur Shyamnarayan Engineering College and faculty in charge of the Robotics & Automation Club. Through her mentorship and support, she created an environment where ideas could become prototypes and students were encouraged to build with confidence.",
    "Her trust, guidance, and commitment to student innovation played an important role in Aurigen's early work, and we remain deeply grateful for her continued support.",
  ],
  portrait: {
    src: "/about/rita-portrait.jpg",
    alt: "Prof. Rita Vora presenting a System on Chip workshop at Thakur Shyamnarayan Engineering College",
    caption: "Prof. Rita Vora",
    aspect: "portrait" as const,
    objectPosition: "72% 20%",
  } satisfies AboutImage,
};

/** Institutional roots. Replaces the former Origin section to avoid duplicate storytelling. */
export const aboutRoots = {
  title: "Where did Aurigen start?",
  body: [
    "Aurigen was born inside the Robotics & Automation Club at Thakur Shyamnarayan Engineering College.",
    "The college provided the environment where ideas were explored, prototypes were built, competitions were prepared for, and a community of builders came together.",
    "We remain grateful to the faculty, the Robotics & Automation Club, and Thakur Shyamnarayan Engineering College for fostering a culture of experimentation and engineering that made Aurigen possible.",
  ],
  photos: [
    {
      src: "/about/roots-01.jpg",
      alt: "Robotics club members holding built robots under the Thakur Shyamnarayan Engineering College banner",
      caption: "Club",
      aspect: "landscape" as const,
      objectPosition: "center 35%",
    },
    {
      src: "/about/roots-02.jpg",
      alt: "Team posing behind the MUDRAGE outdoor robotics competition track with ramps and obstacles",
      caption: "MUDRAGE",
      aspect: "landscape" as const,
      objectPosition: "center 40%",
    },
    {
      src: "/about/roots-04.jpg",
      alt: "Students debugging a project together around a laptop in the lab",
      caption: "Workshop",
      aspect: "portrait" as const,
      objectPosition: "center 30%",
    },
    {
      src: "/about/roots-03.jpg",
      alt: "Team at Automation Expo with a robotic arm prototype, laptop, and sensor demo",
      caption: "Expo",
      aspect: "landscape" as const,
      objectPosition: "center center",
    },
    {
      src: "/about/roots-05.jpg",
      alt: "Certificate presentation under a Robotics and Automation Club welcome screen",
      caption: "RAC",
      aspect: "landscape" as const,
      objectPosition: "center 35%",
    },
    {
      src: "/about/roots-06.jpg",
      alt: "Faculty and students with certificates at a Thakur Shyamnarayan Engineering College event",
      caption: "Campus",
      aspect: "landscape" as const,
      objectPosition: "center 40%",
    },
    {
      src: "/about/roots-07.jpg",
      alt: "Team arriving at ITM Baroda University for a robotics competition",
      caption: "Travel",
      aspect: "landscape" as const,
      objectPosition: "center 35%",
    },
  ] satisfies AboutImage[],
  logos: [
    {
      src: "/about/rac-logo.png",
      alt: "Robotics and Automation Club logo with Thakur Shyamnarayan Engineering College mark",
      label: "Robotics & Automation Club",
    },
  ],
  institutionLabel: "Thakur Shyamnarayan Engineering College",
};

export const aboutPrinciples = {
  eyebrow: "Engineering principles",
  items: [
    {
      title: "Build before you explain",
      body: "A working system beats a polished pitch. Show the machine.",
    },
    {
      title: "Prototype early",
      body: "Touch the constraint while the idea is still cheap to change.",
    },
    {
      title: "Measure everything",
      body: "If you cannot measure it, you cannot improve it.",
    },
    {
      title: "Question assumptions",
      body: "Every design hides a guess. Find it before it finds you.",
    },
    {
      title: "Document your work",
      body: "Notes, diagrams, repos. Future you is a teammate.",
    },
    {
      title: "Ship. Repeat.",
      body: "Finish the loop. Then start the next one.",
    },
  ],
};

export const aboutNext = {
  eyebrow: "Looking forward",
  title: "Next",
  support:
    "We are building the infrastructure for people who invent with intelligent machines.",
  items: [
    { title: "AI Labs", body: "Spaces where models meet real problems." },
    { title: "Robotics Labs", body: "Hardware benches for machines that move." },
    {
      title: "Builder Network",
      body: "People who ship systems and share what works.",
    },
    { title: "Research", body: "Questions that demand evidence, not slogans." },
    {
      title: "Open Source",
      body: "Tools and kits others can fork and improve.",
    },
    {
      title: "School Innovation Labs",
      body: "Campus labs that treat invention as craft.",
    },
    {
      title: "Founder Community",
      body: "Builders who turn systems into companies.",
    },
  ],
};

export const aboutFinalCta = {
  headline: "If this feels like your kind of work, come build with us.",
  primary: { label: "Apply", href: "/#contact" },
  secondary: { label: "Partner", href: "/#schools" },
};

/** Optional historical spine. UI may stay light; data is ready for later. */
export const aboutTimeline: TimelineEvent[] = [
  {
    year: "Before",
    title: "Robotics & Automation Club",
    body: "Students building robots, circuits, and late-night demos inside the college lab.",
  },
  {
    year: "Origin",
    title: "Aurigen takes shape",
    body: "The lab culture becomes an institution: standards, mentorship, and systems that ship.",
  },
  {
    year: "Now",
    title: "Forge builders",
    body: "AI engineers, robotics innovators, researchers, and founders training through real work.",
  },
  {
    year: "Next",
    title: "Labs and network",
    body: "AI labs, robotics labs, school innovation labs, open source, and a founder community.",
  },
];
