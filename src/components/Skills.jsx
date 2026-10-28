import { motion } from 'framer-motion';
import { skills } from '../data/portfolio.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-zinc-50 dark:bg-zinc-900/40">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Skills"
          title="A practical toolkit for modern full stack products."
          description="Strong fundamentals, component-driven frontend development, API design, and database-backed application workflows."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skills.map((skill, index) => (
            <Reveal key={skill.name} className="glass-card p-5" delay={index * 0.02}>
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="font-bold text-zinc-950 dark:text-white">{skill.name}</h3>
                <span className="rounded-lg bg-brand-teal/10 px-3 py-1 text-sm font-bold text-brand-teal">{skill.level}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-lg bg-zinc-200 dark:bg-white/10" aria-label={`${skill.name} proficiency`}>
                <motion.div
                  className="h-full rounded-lg bg-gradient-to-r from-brand-teal via-brand-violet to-brand-coral"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
