import Reveal from './Reveal.jsx';

export default function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  const isLeft = align === 'left';

  return (
    <Reveal className={isLeft ? 'max-w-3xl' : 'mx-auto max-w-3xl text-center'}>
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-coral">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight text-zinc-950 dark:text-white sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
