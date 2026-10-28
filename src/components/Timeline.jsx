import Reveal from './Reveal.jsx';

export default function Timeline({ items }) {
  return (
    <div className="relative mt-12">
      <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-brand-teal via-brand-violet to-brand-coral md:block" />
      <div className="grid gap-6">
        {items.map(({ role, degree, company, school, period, description, icon: Icon }, index) => (
          <Reveal key={`${role ?? degree}-${period}`} className="relative md:pl-16" delay={index * 0.05}>
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-teal text-white shadow-glow md:absolute md:left-0 md:top-6">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <article className="glass-card p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-coral">{period}</p>
              <h3 className="mt-2 text-xl font-bold text-zinc-950 dark:text-white">{role ?? degree}</h3>
              <p className="mt-1 font-semibold text-brand-teal">{company ?? school}</p>
              <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">{description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
