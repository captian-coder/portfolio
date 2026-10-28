import { useMemo, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa6';
import { projects } from '../data/portfolio.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const filters = ['All', 'Full Stack', 'E-Commerce', 'Frontend'];

const projectDetails = [
  {
    category: 'SaaS Web App',
    type: 'Full Stack',
    features: ['Course and lesson management', 'Role-based learner workflows', 'Progress and quiz tracking'],
  },
  {
    category: 'Enterprise Portal',
    type: 'Full Stack',
    features: ['Searchable student records', 'Attendance and grade reporting', 'Admin analytics dashboard'],
  },
  {
    category: 'Full Stack E-Commerce',
    type: 'E-Commerce',
    features: ['Product discovery and filters', 'Cart and checkout-ready flow', 'Inventory management interface'],
  },
  {
    category: 'Frontend Experience',
    type: 'Frontend',
    features: ['Responsive component system', 'Animated project showcases', 'Theme-aware portfolio UI'],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(
    () =>
      projects
        .map((project, index) => ({ ...project, ...projectDetails[index] }))
        .filter((project) => activeFilter === 'All' || project.type === activeFilter),
    [activeFilter],
  );

  return (
    <section
      id="projects"
      className="bg-zinc-50 py-20 text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 sm:py-24"
    >
      <div className="container-shell">
        <SectionHeader
          eyebrow="Selected Work"
          title="Case studies built to solve real workflow problems."
          description="A closer look at product interfaces, engineering decisions, and the details behind each build."
        />

        <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`focus-ring rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-7 space-y-6" aria-live="polite">
          {filteredProjects.map((project, index) => (
            <Reveal
              key={project.title}
              className="grid grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-emerald-500/40 dark:border-zinc-800/80 dark:bg-zinc-900/60 md:p-8 lg:grid-cols-12"
              delay={index * 0.04}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 lg:col-span-7">
                <img
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  loading={index > 1 ? 'lazy' : 'eager'}
                />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/15 bg-zinc-950/85 px-4 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-md"
                    aria-label={`Live preview of ${project.title}`}
                  >
                    Live Preview <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-7 lg:col-span-5">
                <div>
                  <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    {project.category}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                  >
                    Live Demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Source Code
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
