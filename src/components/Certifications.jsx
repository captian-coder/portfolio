import { certifications } from '../data/portfolio.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-white dark:bg-zinc-950">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Certifications"
          title="Continuous learning across frontend, backend, and databases."
          description="Sample certifications are displayed as compact, responsive cards with issuer, date, and credential details."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map(({ title, issuer, date, credential, icon: Icon }, index) => (
            <Reveal key={title} className="soft-card p-6 hover:-translate-y-1 hover:border-brand-violet/50" delay={index * 0.04}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-violet/10 text-brand-violet">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-zinc-950 dark:text-white">{title}</h3>
              <p className="mt-2 font-semibold text-brand-teal">{issuer}</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{date}</p>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{credential}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
