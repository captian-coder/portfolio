import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownToLine, ArrowRight, Command, Moon, Search, Sun } from 'lucide-react';

const pages = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
];

export default function CommandPalette({ isOpen, onClose, isDark, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const commands = useMemo(
    () => [
      ...pages.map((page) => ({
        label: `Go to ${page.label}`,
        keywords: page.label,
        icon: ArrowRight,
        run: () => navigate(page.path),
      })),
      {
        label: `Switch to ${isDark ? 'light' : 'dark'} theme`,
        keywords: 'theme appearance dark light',
        icon: isDark ? Sun : Moon,
        run: onToggleTheme,
      },
      {
        label: 'Download CV',
        keywords: 'resume curriculum vitae',
        icon: ArrowDownToLine,
        href: '/ali-shair-cv.pdf',
      },
    ],
    [isDark, navigate, onToggleTheme],
  );

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.keywords}`.toLowerCase().includes(normalizedQuery),
    );
  }, [commands, query]);

  useEffect(() => {
    if (!isOpen) return undefined;
    setQuery('');
    setActiveIndex(0);
    inputRef.current?.focus();
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex >= filteredCommands.length) setActiveIndex(0);
  }, [activeIndex, filteredCommands.length]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const runCommand = (command) => {
    if (command.href) {
      const link = document.createElement('a');
      link.href = command.href;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      command.run();
    }
    onClose();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (filteredCommands.length) {
        setActiveIndex((index) => (index + 1) % filteredCommands.length);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (filteredCommands.length) {
        setActiveIndex((index) => (index - 1 + filteredCommands.length) % filteredCommands.length);
      }
    } else if (event.key === 'Enter' && filteredCommands[activeIndex]) {
      event.preventDefault();
      runCommand(filteredCommands[activeIndex]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 px-4 pt-[15vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        <h2 id="command-palette-title" className="sr-only">Command palette</h2>
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800">
          <Search className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search pages and actions..."
            aria-label="Search command palette"
            className="h-14 min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
          />
          <kbd className="rounded-md border border-zinc-200 px-1.5 py-1 text-[10px] text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">ESC</kbd>
        </div>

        <div className="max-h-[min(55vh,420px)] overflow-y-auto p-2">
          {filteredCommands.length ? (
            filteredCommands.map((command, index) => {
              const Icon = command.icon;
              return (
                <button
                  key={command.label}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runCommand(command)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors ${
                    activeIndex === index
                      ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span className="flex-1">{command.label}</span>
                  {index === activeIndex && <Command className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />}
                </button>
              );
            })
          ) : (
            <p className="px-3 py-8 text-center text-sm text-zinc-500">No matching pages or actions.</p>
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-zinc-200 px-4 py-3 text-[11px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <span><kbd className="mr-1 rounded border border-zinc-200 px-1 dark:border-zinc-700">↑↓</kbd> Navigate</span>
          <span><kbd className="mr-1 rounded border border-zinc-200 px-1 dark:border-zinc-700">↵</kbd> Select</span>
        </div>
      </section>
    </div>
  );
}
