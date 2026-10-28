import { ArrowUpRight, BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { education, experience } from '../data/portfolio.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const journey = [
  ...experience.map((item) => ({ ...item, kind: 'Work' })),
  ...education.map((item) => ({
    role: item.degree,
    company: item.school,
    period: item.period,
    description: item.description,
    icon: item.icon,
    kind: 'Education',
  })),
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-zinc-50 py-20 text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 sm:py-24"
    >
      <div className="container-shell">
        <SectionHeader
          eyebrow="Experience"
          title="A considered path from foundations to shipped products."
          description="Professional practice and education that shape a reliable, product-minded engineering approach."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800/80 dark:bg-zinc-900/60">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                Engineering Journey
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Engineering Journey &amp; Education
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                Building practical experience across frontend interfaces, full-stack products, backend systems, and software engineering fundamentals.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
                  <p className="text-xl font-semibold">2026</p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Professional work</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
                  <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Software Engineering</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="relative ml-2 border-l-2 border-zinc-200 pl-8 dark:border-zinc-800">
            <div className="space-y-10">
              {journey.map(({ role, company, period, description, kind, icon: Icon }, index) => (
                <Reveal key={`${role}-${period}`} className="relative" delay={index * 0.04}>
                  <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-zinc-50 bg-emerald-500 ring-4 ring-emerald-500/20 dark:border-[#09090b]" aria-hidden="true" />
                  <article className="rounded-3xl border border-zinc-200 bg-white p-6 transition-colors hover:border-emerald-500/30 dark:border-zinc-800/80 dark:bg-zinc-900/60 md:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        {kind}
                      </span>
                      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                        {period}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight">{role}</h3>
                    <p className="mt-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      {company}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {description}
                    </p>
                    <a
                      href="/contact"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400"
                    >
                      Discuss a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
