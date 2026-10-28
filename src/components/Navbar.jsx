import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Command, Menu, X } from 'lucide-react';
import CommandPalette from './CommandPalette.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar({ isDark, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsPaletteOpen((open) => !open);
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-1 text-xs font-medium transition-colors ${
      isActive
        ? 'border border-teal-500/30 bg-teal-500/20 text-teal-300'
        : 'border border-transparent text-slate-400 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#070b12] px-4 pt-4">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-3 backdrop-blur-md">
        <NavLink
          to="/"
          className="bg-gradient-to-r from-cyan-400 via-teal-300 to-orange-400 bg-clip-text text-xl font-bold tracking-tighter text-transparent"
          aria-label="Ali Shair home"
        >
          AS<span className="text-emerald-500">.</span>
        </NavLink>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-slate-950/70 p-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaletteOpen(true)}
            className="focus-ring inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-slate-950/60 px-2.5 text-xs font-medium text-slate-400 transition-colors hover:border-teal-500/30 hover:text-white focus-visible:ring-offset-[#070b12]"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="rounded border border-white/10 px-1 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </button>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-950/60 text-slate-400 transition-colors hover:border-teal-500/30 hover:text-white focus-visible:ring-offset-[#070b12] lg:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" className="mx-auto max-w-6xl px-6 pb-4 lg:hidden">
          <div className="grid gap-1 rounded-xl border border-zinc-800 bg-zinc-900 p-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
    </header>
  );
}
