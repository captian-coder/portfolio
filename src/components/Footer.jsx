import { FiArrowUp } from 'react-icons/fi';
import { navLinks, profile, socials } from '../data/portfolio.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 py-12 text-white dark:border-white/10">
      <div className="container-shell grid gap-8 md:grid-cols-[1fr_auto_auto] md:items-start">
        <div>
          <a href="#home" className="focus-ring rounded-lg text-2xl font-black">
            <span className="gradient-text">AS</span>
          </a>
          <p className="mt-4 max-w-md leading-7 text-zinc-300">
            Building modern full stack web applications with thoughtful design, clean code, and reliable delivery.
          </p>
          <p className="mt-5 text-sm text-zinc-400">© {year} {profile.name}. All rights reserved.</p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">Quick Links</h2>
          <div className="mt-4 grid gap-2">
            {navLinks.slice(0, 6).map((link) => (
              <a key={link.href} href={link.href} className="focus-ring rounded-lg text-zinc-300 transition hover:text-brand-teal">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">Social</h2>
          <div className="mt-4 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white transition hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal"
                aria-label={label}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
            <a
              href="#home"
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-teal text-white transition hover:-translate-y-0.5 hover:bg-teal-500"
              aria-label="Back to top"
            >
              <FiArrowUp className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
