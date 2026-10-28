import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../data/portfolio.js';
import SectionHeader from './SectionHeader.jsx';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  const goTo = (direction) => {
    setActiveIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => goTo(1), 5500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-zinc-50 dark:bg-zinc-900/40">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Testimonials"
          title="What clients and collaborators say."
          description="A responsive slider with sample feedback from teams that needed polished interfaces and reliable full stack delivery."
        />

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="glass-card relative overflow-hidden p-6 sm:p-10">
            <FaQuoteLeft
              className="h-12 w-12 text-brand-coral/70"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.figure
                key={active.name}
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -26 }}
                transition={{ duration: 0.35 }}
                className="mt-5"
              >
                <blockquote className="text-xl font-semibold leading-9 text-zinc-800 dark:text-zinc-100 sm:text-2xl">
                  "{active.quote}"
                </blockquote>

                <figcaption className="mt-6">
                  <p className="font-bold text-zinc-950 dark:text-white">
                    {active.name}
                  </p>
                  <p className="text-sm font-semibold text-brand-teal">
                    {active.role}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex gap-2" aria-label="Testimonial slides">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    className={`h-3 rounded-lg transition ${
                      activeIndex === index
                        ? 'w-8 bg-brand-teal'
                        : 'w-3 bg-zinc-300 dark:bg-white/20'
                    }`}
                    aria-label={`Show testimonial from ${testimonial.name}`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-800 transition hover:border-brand-teal hover:text-brand-teal dark:border-white/10 dark:bg-white/10 dark:text-white"
                  aria-label="Previous testimonial"
                  onClick={() => goTo(-1)}
                >
                  <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-800 transition hover:border-brand-teal hover:text-brand-teal dark:border-white/10 dark:bg-white/10 dark:text-white"
                  aria-label="Next testimonial"
                  onClick={() => goTo(1)}
                >
                  <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}