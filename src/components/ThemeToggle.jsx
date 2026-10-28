import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ isDark, onToggle }) {
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-950/60 text-slate-400 transition-colors hover:border-teal-500/30 hover:text-white focus-visible:ring-offset-[#070b12]"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
