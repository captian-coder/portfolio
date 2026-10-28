import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, Mail, Send } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa6';
import { profilePortrait } from '../assets';
import { profile, socials } from '../data/portfolio.js';

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const headingLines = [
  "Hi, I'm Ali Shair",
  'Full Stack Web Developer',
  'I Build Modern Websites',
  "I'm Available for Work",
];

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = headingLines[lineIndex];
    let delay = isDeleting ? 42 : 82;
    let timeout;

    if (!isDeleting && typedText === currentLine) {
      delay = 1350;
      timeout = window.setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && typedText.length === 0) {
      timeout = window.setTimeout(() => {
        setIsDeleting(false);
        setLineIndex((index) => (index + 1) % headingLines.length);
      }, 180);
    } else {
      timeout = window.setTimeout(() => {
        setTypedText((text) =>
          isDeleting ? text.slice(0, -1) : currentLine.slice(0, text.length + 1),
        );
      }, delay);
    }

    return () => window.clearTimeout(timeout);
  }, [isDeleting, lineIndex, typedText]);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#070b12] font-sans text-white"
    >
      <div
        className="pointer-events-none absolute -left-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-cyan-500/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-teal-500/[0.07] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 lg:col-span-7"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" aria-hidden="true" />
            Available for web projects <span aria-hidden="true">•</span> Active
          </div>

          <div>
            <h1
              aria-label={headingLines[lineIndex]}
              className="min-h-[2.4em] text-4xl font-extrabold leading-tight tracking-tight text-white sm:min-h-[1.3em] sm:text-5xl lg:text-6xl"
            >
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-orange-400 bg-[length:200%_200%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              >
                {typedText}
              </motion.span>
              <span
                className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.08em] animate-pulse bg-cyan-300 align-baseline"
                aria-hidden="true"
              />
            </h1>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
              {profile.title}
            </h2>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {profile.intro}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={profile.cv}
              download
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_20px_rgba(20,184,166,0.35)] transition-all hover:from-cyan-300 hover:to-teal-300 focus-visible:ring-offset-[#070b12]"
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
            <a
              href="#contact"
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/90 px-6 py-3 text-white transition-all hover:bg-slate-800 focus-visible:ring-offset-[#070b12]"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Hire Me
            </a>
          </div>

          <div className="flex items-center gap-3 pt-2" aria-label="Social links">
            {socials.map(({ label, href }) => {
              const Icon = socialIcons[label];

              return (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/70 text-slate-400 transition-all hover:border-cyan-500/50 hover:bg-slate-900 hover:text-cyan-200 focus-visible:ring-offset-[#070b12]"
                  aria-label={label}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:col-span-5 lg:justify-end"
          aria-label="Profile portrait and project experience"
        >
          <div className="group relative mx-auto w-full max-w-[400px]">
            <div
              className="absolute -inset-1 rounded-[28px] bg-gradient-to-tr from-cyan-500/40 via-purple-500/30 to-orange-400/30 opacity-75 blur-xl transition duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <motion.div
              className="pointer-events-none absolute -left-1 right-2 top-[22%] bottom-[8%] z-10 rounded-[28px] border border-teal-300/30 bg-gradient-to-br from-teal-400/50 via-cyan-500/30 to-blue-900/60 shadow-[0_0_28px_rgba(20,184,166,0.18)] sm:-left-4 lg:-left-9"
              animate={{ y: [0, -5, 0], rotate: [-14, -12, -14] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <motion.div
              className="pointer-events-none absolute left-[25%] right-[8%] -top-1 bottom-[4%] z-10 rounded-[28px] border border-cyan-200/30 bg-gradient-to-tr from-cyan-300/40 via-teal-400/25 to-blue-800/50 shadow-[0_0_26px_rgba(34,211,238,0.16)] sm:-top-3"
              animate={{ y: [0, 4, 0], rotate: [9, 7, 9] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              aria-hidden="true"
            />
            <motion.div
              className="pointer-events-none absolute left-[12%] -right-1 top-[8%] bottom-[10%] z-10 rounded-[28px] border border-blue-300/25 bg-gradient-to-r from-blue-900/65 via-cyan-500/25 to-sky-400/35 shadow-[0_0_24px_rgba(59,130,246,0.16)] sm:-right-3 lg:-right-5"
              animate={{ y: [0, -3, 0], rotate: [6, 4, 6] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              aria-hidden="true"
            />
            <div className="relative z-20 aspect-[4/4.6] overflow-hidden rounded-[24px] bg-slate-900 shadow-2xl ring-1 ring-white/20">
              <img
                src={profilePortrait}
                alt={`${profile.name}, ${profile.title}`}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                width="900"
                height="900"
              />
              <svg
                className="pointer-events-none absolute inset-0 z-10 h-full w-full"
                viewBox="0 0 400 460"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="portrait-border-cyan" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
                    <stop offset="42%" stopColor="#67e8f9" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="#a5f3fc" stopOpacity="1" />
                    <stop offset="58%" stopColor="#22d3ee" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="portrait-border-teal" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5eead4" stopOpacity="0" />
                    <stop offset="44%" stopColor="#5eead4" stopOpacity="0.12" />
                    <stop offset="50%" stopColor="#ccfbf1" stopOpacity="0.95" />
                    <stop offset="57%" stopColor="#14b8a6" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="portrait-border-blue" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
                    <stop offset="45%" stopColor="#818cf8" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.9" />
                    <stop offset="56%" stopColor="#6366f1" stopOpacity="0.26" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                  <filter id="portrait-border-light-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>
                <motion.rect
                  x="1"
                  y="1"
                  width="398"
                  height="458"
                  rx="24"
                  fill="none"
                  stroke="url(#portrait-border-cyan)"
                  strokeWidth="4"
                  strokeDasharray="145 1565"
                  strokeLinecap="round"
                  opacity="0.65"
                  filter="url(#portrait-border-light-glow)"
                  animate={{ strokeDashoffset: [0, -1710] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.rect
                  x="1"
                  y="1"
                  width="398"
                  height="458"
                  rx="24"
                  fill="none"
                  stroke="url(#portrait-border-cyan)"
                  strokeWidth="1.5"
                  strokeDasharray="145 1565"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [0, -1710] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.rect
                  x="1"
                  y="1"
                  width="398"
                  height="458"
                  rx="24"
                  fill="none"
                  stroke="url(#portrait-border-teal)"
                  strokeWidth="3.5"
                  strokeDasharray="115 1595"
                  strokeLinecap="round"
                  opacity="0.5"
                  filter="url(#portrait-border-light-glow)"
                  animate={{ strokeDashoffset: [-570, -2280] }}
                  transition={{ duration: 6.8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.rect
                  x="1"
                  y="1"
                  width="398"
                  height="458"
                  rx="24"
                  fill="none"
                  stroke="url(#portrait-border-teal)"
                  strokeWidth="1.25"
                  strokeDasharray="115 1595"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [-570, -2280] }}
                  transition={{ duration: 6.8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.rect
                  x="1"
                  y="1"
                  width="398"
                  height="458"
                  rx="24"
                  fill="none"
                  stroke="url(#portrait-border-blue)"
                  strokeWidth="3.5"
                  strokeDasharray="100 1610"
                  strokeLinecap="round"
                  opacity="0.42"
                  filter="url(#portrait-border-light-glow)"
                  animate={{ strokeDashoffset: [-1140, -2850] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.rect
                  x="1"
                  y="1"
                  width="398"
                  height="458"
                  rx="24"
                  fill="none"
                  stroke="url(#portrait-border-blue)"
                  strokeWidth="1.25"
                  strokeDasharray="100 1610"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [-1140, -2850] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
              </svg>
              <div
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/15 bg-slate-900/75 px-4 py-3 shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-cyan-400">10+</span>
                  <span className="text-xs font-medium text-slate-200">Projects Completed</span>
                </div>
                <span
                  className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  aria-label="Verified project experience"
                />
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-36 sm:h-48 lg:h-56"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <motion.svg
          className="h-full w-full"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            <linearGradient id="hero-bottom-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0b1d3a" stopOpacity="0.16" />
              <stop offset="38%" stopColor="#075985" stopOpacity="0.28" />
              <stop offset="62%" stopColor="#0891b2" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#10244a" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="hero-bottom-edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
              <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.38" />
              <stop offset="72%" stopColor="#22d3ee" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="hero-bottom-depth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b1d3a" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.42" />
            </linearGradient>
            <filter id="hero-bottom-glow" x="-10%" y="-40%" width="120%" height="180%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <path
            d="M0 150 C205 144 292 55 545 66 C790 76 910 172 1125 190 C1242 200 1350 204 1440 210 L1440 240 L0 240 Z"
            fill="url(#hero-bottom-gradient)"
            filter="url(#hero-bottom-glow)"
          />
          <path
            d="M0 150 C205 144 292 55 545 66 C790 76 910 172 1125 190 C1242 200 1350 204 1440 210 L1440 240 L0 240 Z"
            fill="url(#hero-bottom-depth)"
          />
          <path
            d="M0 150 C205 144 292 55 545 66 C790 76 910 172 1125 190 C1242 200 1350 204 1440 210"
            fill="none"
            stroke="url(#hero-bottom-edge)"
            strokeWidth="1.5"
            opacity="0.8"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
