export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status?: string;
  highlights: string[];
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  description: string[];
  skills: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  icon: string;
  skills: { name: string; level?: string; tag?: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  exam: string;
  discipline: string;
  score: string;
  maxScore: string;
  year: string;
  details: string;
  status: string;
  highlight: boolean;
}

export const PROFILE = {
  name: "Amit Raj",
  title: "M.Tech Electric Mobility Student",
  institution: "Indian Institute of Technology Delhi (IIT Delhi)",
  graduationYear: "2028",
  gateStatus: "GATE 2026 Qualified (EE & IN)",
  tagline: "Specializing in Power Systems, Electric Vehicle Architectures & Smart Grid Technologies",
  location: "Nalanda, Bihar, India",
  email: "amit.raj.ee@gmail.com",
  linkedin: "https://linkedin.com/in/amit-raj-b12a11200",
  github: "https://github.com",
  gateScore: "530 / 1000",
  avatar: "/images/amit-image.jpeg",
  
  hero: {
    badge: "⚡ Electrical Engineer | Electric Mobility",
    headline: "Amit Raj",
    subtitle: "M.Tech Electric Mobility | IIT Delhi'28 | GATE'26 Qualified",
    summary: "Passionate Electrical Engineer exploring electric vehicle dynamics, battery management, power electronics, and high-voltage transmission networks.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Download Resume",
  },

  about: {
    bio: "I am an M.Tech student in Electric Mobility at IIT Delhi (2026–2028), having completed my B.Tech in Electrical Engineering from Bhagalpur College of Engineering. Driven by a deep interest in sustainable transportation and smart energy grids, I qualified GATE 2026 with a score of 530/1000 in Electrical Engineering. My practical expertise spans hands-on power distribution internship experience at SBPDCL, power system protection, circuit design, and software modeling tools like MATLAB/Simulink and Python.",
    origin: "Nalanda, Bihar",
    chips: [
      { label: "Location", value: "Nalanda, Bihar, India", icon: "MapPin" },
      { label: "GATE 2026 Score", value: "530 / 1000 (EE)", icon: "Award" },
      { label: "Current Institution", value: "IIT Delhi (Electric Mobility)", icon: "GraduationCap" },
      { label: "Specialization", value: "Electric Vehicles & Power Systems", icon: "Zap" },
    ],
    stats: [
      { number: "530", label: "GATE '26 EE Score" },
      { number: "2+", label: "Power Grid Internships" },
      { number: "10+", label: "Tools & Technologies" },
      { number: "2028", label: "M.Tech Graduation" },
    ],
  },

  education: [
    {
      id: "iit-delhi",
      degree: "M.Tech in Electric Mobility",
      institution: "Indian Institute of Technology Delhi (IIT Delhi)",
      location: "New Delhi, India",
      period: "Jun 2026 – Jun 2028",
      status: "Ongoing (Enrolled)",
      highlights: [
        "Core Focus: Electric Drive Systems, Battery Management Systems (BMS), Power Converters",
        "Vehicle Dynamics & EV Charging Infrastructure modeling",
        "Advanced Research in Energy Storage & Grid Integration",
      ],
      icon: "Cpu",
    },
    {
      id: "bce-bhagalpur",
      degree: "B.Tech in Electrical Engineering",
      institution: "Bhagalpur College of Engineering (BCE)",
      location: "Bhagalpur, Bihar",
      period: "Oct 2022 – May 2026",
      status: "Completed",
      highlights: [
        "Rigorous training in Power Systems, Control Systems, Electrical Machines & Protection",
        "Qualified GATE 2026 in EE and IN streams during final year",
        "Hands-on project work in microcontrollers, CATIA design, and MATLAB simulations",
      ],
      icon: "BookOpen",
    },
    {
      id: "spm-college",
      degree: "Intermediate PCM (Higher Secondary 12th)",
      institution: "Sardar Patel Memorial College",
      location: "Biharsharif, Bihar",
      period: "2019 – 2021",
      status: "Completed",
      highlights: [
        "Focus on Physics, Chemistry, and Mathematics",
        "Strong foundation in Calculus, Electromagnetic Theory, and Mechanics",
      ],
      icon: "School",
    },
  ] as Education[],

  experience: [
    {
      id: "sbpdcl-intern",
      role: "Student Intern",
      company: "South Bihar Power Distribution Company Limited (SBPDCL)",
      period: "Dec 2025 – Jan 2026",
      duration: "2 Months",
      location: "Bhagalpur East, Bihar (On-site)",
      type: "Industrial Internship",
      description: [
        "Observed and analyzed operations of high-voltage transmission substations, power transformers, and switchgears.",
        "Studied real-time circuit breaker operations (SF6 & Vacuum breakers) and protective relaying protocols.",
        "Gained practical knowledge in feeder load balancing, fault detection, and distribution network protection.",
        "Worked alongside field engineers to inspect thermal imaging of switchyard equipment and transformer oil testing.",
      ],
      skills: [
        "Circuit Breaker",
        "Power Distribution",
        "Power Transmission",
        "Power Protection",
        "Power Plants",
        "Transformers",
      ],
    },
  ] as Experience[],

  skillGroups: [
    {
      category: "Power Systems & Electrical Engineering",
      description: "Core electrical domain expertise developed through academic training and field internship.",
      icon: "Zap",
      skills: [
        { name: "Power Plants", level: "Advanced", tag: "Generation" },
        { name: "Transformers", level: "Advanced", tag: "Equipment" },
        { name: "Power Distribution", level: "Advanced", tag: "Grid" },
        { name: "Power Transmission", level: "Advanced", tag: "High Voltage" },
        { name: "Power System Protection", level: "Intermediate", tag: "Relays" },
        { name: "Circuit Breakers", level: "Advanced", tag: "Switchgear" },
        { name: "Electric Vehicle Powertrains", level: "Emerging", tag: "EV Tech" },
        { name: "Battery Management Systems", level: "Emerging", tag: "Energy" },
      ],
    },
    {
      category: "Programming, Tools & Engineering Software",
      description: "Software simulation, coding, CAD modeling, and hardware prototyping toolset.",
      icon: "Terminal",
      skills: [
        { name: "C Programming", level: "Proficient", tag: "Language" },
        { name: "Python", level: "Proficient", tag: "Data Analysis" },
        { name: "MATLAB", level: "Advanced", tag: "Simulation" },
        { name: "Simulink", level: "Advanced", tag: "Control Systems" },
        { name: "Arduino IDE", level: "Intermediate", tag: "Embedded" },
        { name: "CATIA", level: "Intermediate", tag: "3D CAD" },
        { name: "3D Printing", level: "Hands-on", tag: "Prototyping" },
        { name: "HTML/CSS", level: "Intermediate", tag: "Web" },
        { name: "Microsoft Excel", level: "Advanced", tag: "Analytics" },
      ],
    },
  ] as SkillCategory[],

  achievements: [
    {
      id: "gate-2026-ee",
      title: "GATE 2026 Qualified",
      exam: "Graduate Aptitude Test in Engineering (GATE)",
      discipline: "Electrical Engineering (EE)",
      score: "530",
      maxScore: "1000",
      year: "2026",
      details: "Secured competitive score enabling admission to prestigious M.Tech Electric Mobility program at IIT Delhi.",
      status: "Qualified",
      highlight: true,
    },
    {
      id: "gate-2026-in",
      title: "GATE 2026 Dual Stream",
      exam: "Graduate Aptitude Test in Engineering (GATE)",
      discipline: "Instrumentation Engineering (IN)",
      score: "Qualified",
      maxScore: "1000",
      year: "2026",
      details: "Demonstrated strong interdisciplinary proficiency across sensors, signal processing, and measurement systems.",
      status: "Qualified",
      highlight: false,
    },
  ] as Achievement[],

  socialLinks: {
    linkedin: "https://linkedin.com/in/amit-raj-b12a11200",
    email: "amit.raj.ee@gmail.com",
    github: "https://github.com",
  },
};
