import { ArrowRight, Boxes, Code2, Database, ShoppingBag, Sparkles } from 'lucide-react';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const servicePackages = [
  {
    title: 'Full-Stack Web Applications',
    description: 'Custom dashboards, SaaS platforms, and scalable architectures shaped around your workflows.',
    icon: Boxes,
    deliverables: ['Product dashboards', 'SaaS foundations', 'Role-based access', 'Deployment-ready code'],
  },
  {
    title: 'E-Commerce & Store Development',
    description: 'High-converting online stores with thoughtful shopping flows and practical admin tools.',
    icon: ShoppingBag,
    deliverables: ['Storefront & catalog', 'Cart and checkout flows', 'Admin inventory panels', 'Payment integration'],
  },
  {
    title: 'Backend APIs & Database Architecture',
    description: 'Reliable data foundations, secure APIs, and integrations built for maintainable growth.',
    icon: Database,
    deliverables: ['REST API design', 'MongoDB and SQL models', 'Authentication flows', 'Query optimization'],
  },
  {
    title: 'UI/UX Engineering & Performance',
    description: 'Accessible, responsive interfaces with the speed and detail users expect from modern products.',
    icon: Sparkles,
    deliverables: ['Responsive UI systems', 'Tailwind component libraries', 'Performance tuning', 'SEO-ready Next.js apps'],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-zinc-50 py-20 text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 sm:py-24"
    >
      <div className="container-shell">
        <SectionHeader
          eyebrow="Services"
          title="Solutions engineered around your next stage."
          description="Focused service packages that take ideas from first interface to dependable production systems."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {servicePackages.map(({ title, description, icon: Icon, deliverables }, index) => (
            <Reveal
              key={title}
              className="group rounded-3xl border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 dark:border-zinc-800/80 dark:bg-zinc-900/60 md:p-8"
              delay={index * 0.05}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <Code2 className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-emerald-500 dark:text-zinc-700" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <a
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-zinc-800 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400"
              >
                Request Service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
