import { cn } from '../utils/cn.js';

const variants = {
  primary:
    'bg-gradient-to-r from-brand-teal to-teal-500 text-white shadow-[0_12px_30px_rgba(20,184,166,.25)] hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(20,184,166,.35)] focus-visible:ring-brand-teal',
  secondary:
    'border border-zinc-300/80 bg-white/75 text-zinc-900 shadow-sm backdrop-blur hover:-translate-y-1 hover:border-brand-violet/50 hover:bg-brand-violet/5 hover:text-brand-violet hover:shadow-[0_12px_30px_rgba(139,92,246,.12)] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-brand-violet/10 dark:hover:text-violet-300',
  dark:
    'bg-zinc-950 text-white hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200',
};

export default function Button({
  as: Component = 'a',
  className = '',
  children,
  icon: Icon,
  variant = 'primary',
  ...props
}) {
  return (
    <Component
      className={cn(
        'focus-ring inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-bold transition duration-300',
        variants[variant],
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      <span>{children}</span>
    </Component>
  );
}
