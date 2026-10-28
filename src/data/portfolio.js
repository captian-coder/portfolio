import {
  FaCode,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaGraduationCap,
  FaLinkedin,
  FaLocationDot,
  FaMobileScreenButton,
  FaNodeJs,
  FaPhone,
  FaReact,
  FaServer,
} from 'react-icons/fa6';
import { FiAward, FiBookOpen, FiBriefcase, FiCpu, FiLayers, FiLink } from 'react-icons/fi';
import { projectEcommerce, projectLms, projectPortfolio, projectStudent } from '../assets';

export const profile = {
  name: 'ALI SHAIR',
  title: 'Full Stack Web Developer',
  intro:
    'I build polished, scalable, and accessible web applications that combine clean interfaces with reliable backend systems.',
  email: 'm.alishair180180@gmail.com',
  phone: '+92 3471061154',
  location: 'Faisalabad, Pakistan',
  cv: '/ali-shair-cv.pdf',
};

export const navLinks = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/captian-coder', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: FaLinkedin },
  { label: 'Email', href: `mailto:${profile.email}`, icon: FaEnvelope },
];

export const personalInfo = [
  { label: 'Name', value: profile.name },
  { label: 'Role', value: profile.title },
  { label: 'Email', value: profile.email },
  { label: 'Phone', value: profile.phone },
  { label: 'Location', value: profile.location },
  { label: 'Availability', value: 'Open to freelance and full-time roles' },
];

export const skills = [
  { name: 'HTML5', level: 96 },
  { name: 'CSS3', level: 94 },
  { name: 'JavaScript (ES6+)', level: 92 },
  { name: 'React.js', level: 90 },
  { name: 'Node.js', level: 86 },
  { name: 'Express.js', level: 84 },
  { name: 'MongoDB', level: 82 },
  { name: 'Tailwind CSS', level: 91 },
  { name: 'Git & GitHub', level: 88 },
  { name: 'REST APIs', level: 89 },
];

export const services = [
  {
    title: 'Frontend Development',
    description: 'Responsive React interfaces with accessible components, motion, and performance-minded architecture.',
    icon: FaReact,
  },
  {
    title: 'Backend Development',
    description: 'Secure APIs, authentication flows, database models, and server-side business logic using Node.js.',
    icon: FaServer,
  },
  {
    title: 'Full Stack Development',
    description: 'Complete MERN applications from design systems and dashboards to REST APIs and deployment readiness.',
    icon: FiLayers,
  },
  {
    title: 'Responsive Web Design',
    description: 'Mobile-first layouts that feel natural across phones, tablets, laptops, and large desktop displays.',
    icon: FaMobileScreenButton,
  },
  {
    title: 'API Integration',
    description: 'Clean third-party integrations, payment flows, dashboards, maps, email services, and data syncs.',
    icon: FiLink,
  },
];

export const projects = [
  {
    title: 'Learning Management System',
    description:
      'A role-based LMS for courses, lessons, quizzes, progress tracking, and instructor dashboards.',
    image: projectLms,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/',
    demo: 'https://example.com/lms',
  },
  {
    title: 'Student Management System',
    description:
      'A student records platform with attendance, grade reports, admin analytics, and searchable profiles.',
    image: projectStudent,
    technologies: ['React', 'Tailwind CSS', 'REST APIs', 'MongoDB'],
    github: 'https://github.com/',
    demo: 'https://example.com/student-management',
  },
  {
    title: 'E-Commerce Website',
    description:
      'A conversion-focused storefront with product filters, cart state, checkout-ready flow, and admin inventory UI.',
    image: projectEcommerce,
    technologies: ['React', 'Node.js', 'Stripe', 'Express', 'MongoDB'],
    github: 'https://github.com/',
    demo: 'https://example.com/ecommerce',
  },
  {
    title: 'Portfolio Website',
    description:
      'A premium personal brand site with animated sections, dark mode, project showcases, and contact workflows.',
    image: projectPortfolio,
    technologies: ['Vite', 'React', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/',
    demo: 'https://example.com/portfolio',
  },
];

export const experience = [
  {
    role: 'Full Stack Web Developer',
    company: 'Freelance',
    period: '2026 - Present',
    description:
      'Designing and shipping responsive business websites, admin dashboards, REST APIs, and database-backed web applications for small teams.',
    icon: FiBriefcase,
  },
  {
    role: 'MERN Stack Intern',
    company: 'CodeCraft Labs',
    period: '2026 - Present',
    description:
      'Built reusable React components, integrated Express APIs, and improved frontend performance for internal product modules.',
    icon: FaNodeJs,
  },
  {
    role: 'Frontend Developer',
    company: 'Academic and Personal Projects',
    period: '2022 - 2023',
    description:
      'Created accessible interfaces, practiced component-driven development, and shipped multiple responsive web projects.',
    icon: FaCode,
  },
];

export const education = [
  {
    degree: 'BS Software Engineering',
    school: 'NUML University of Pakistan',
    period: '2026 - 2030',
    description: 'Focused on web engineering, database systems, software architecture, and human-computer interaction.',
    icon: FaGraduationCap,
  },
  {
    degree: 'Intermediate in Computer Science',
    school: 'Punjab Group of Colleges',
    period: '2023 - 2025',
    description: 'Built a foundation in programming, mathematics, and computer systems.',
    icon: FiBookOpen,
  },
];

export const certifications = [
  {
    title: 'Meta Front-End Developer',
    issuer: 'Coursera',
    date: '2026',
    credential: 'Credential ID: MFD-2024-118',
    icon: FiAward,
  },
  {
    title: 'Node.js API Development',
    issuer: 'Udemy',
    date: '2026',
    credential: 'Credential ID: NODE-API-742',
    icon: FaServer,
  },
  {
    title: 'MongoDB Developer Fundamentals',
    issuer: 'MongoDB University',
    date: '2026',
    credential: 'Credential ID: MDB-FND-318',
    icon: FaDatabase,
  },
  {
    title: 'JavaScript Algorithms',
    issuer: 'freeCodeCamp',
    date: '2026',
    credential: 'Credential ID: FCC-JS-920',
    icon: FiCpu,
  },
];

export const testimonials = [
  {
    name: 'Ayesha Khan',
    role: 'Founder, LearnPro',
    quote:
      'Hassan transformed our course idea into a fast, easy-to-manage LMS. The interface feels premium and the admin tools saved our team hours each week.',
  },
  {
    name: 'Daniel Reed',
    role: 'Product Manager',
    quote:
      'He communicates clearly, thinks through edge cases, and ships clean React code. The final dashboard looked sharp and performed beautifully.',
  },
  {
    name: 'Sara Malik',
    role: 'Operations Lead',
    quote:
      'Our student management workflow became much smoother. Hassan delivered a responsive system that our staff could use confidently from day one.',
  },
];

export const contactCards = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: FaEnvelope },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: FaPhone },
  { label: 'Location', value: profile.location, href: 'https://maps.google.com/?q=Lahore%2C%20Pakistan', icon: FaLocationDot },
];
