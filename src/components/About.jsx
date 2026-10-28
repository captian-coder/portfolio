import { FiTarget, FiUserCheck } from 'react-icons/fi';
import { personalInfo } from '../data/portfolio.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-zinc-950">
      <div className="container-shell">
        <SectionHeader
          eyebrow="About me"
          title="A developer who blends product thinking with clean engineering."
          description="I care about building web experiences that are fast, maintainable, accessible, and genuinely useful for the people who rely on them."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal className="glass-card p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
                <FiUserCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Professional Summary</h3>
                <p className="mt-4 leading-8 text-zinc-600 dark:text-zinc-300">
                  I am a Full Stack Web Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, and
                  Tailwind CSS. My work focuses on reusable frontend systems, dependable backend APIs, responsive
                  layouts, and user-friendly workflows that make complex products feel simple.
                </p>
                <p className="mt-4 leading-8 text-zinc-600 dark:text-zinc-300">
                  I enjoy turning business requirements into polished web applications, from dashboards and portals to
                  e-commerce stores and portfolio websites.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="glass-card p-6 sm:p-8" delay={0.08}>
            <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Personal Information</h3>
            <dl className="mt-6 grid gap-4">
              {personalInfo.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 border-b border-zinc-200 pb-3 last:border-b-0 dark:border-white/10">
                  <dt className="text-sm font-bold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">{item.label}</dt>
                  <dd className="font-semibold text-zinc-900 dark:text-zinc-100">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="glass-card p-6 sm:p-8 lg:col-span-2" delay={0.12}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-coral/10 text-brand-coral">
                <FiTarget className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Career Objectives</h3>
                <p className="mt-4 max-w-5xl leading-8 text-zinc-600 dark:text-zinc-300">
                  My goal is to contribute to meaningful products as a full stack developer, grow deeper in system
                  design and cloud-ready architecture, and keep shipping software that is stable, elegant, and easy for
                  teams to maintain.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
