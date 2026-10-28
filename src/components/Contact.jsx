import { useEffect, useState } from 'react';
import { Check, Clock3, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { profile } from '../data/portfolio.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const projectTypes = ['Web App', 'E-Commerce', 'Custom Project', 'Hiring'];
const initialForm = { name: '', email: '', message: '' };
const phoneDigits = profile.phone.replace(/\D/g, '');

function getPakistanTime() {
  return new Intl.DateTimeFormat('en-PK', {
    timeZone: 'Asia/Karachi',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date());
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState(getPakistanTime);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => setLocalTime(getPakistanTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Unable to copy the contact email to clipboard.', error);
      setStatus('Could not access the clipboard. Please copy the email address manually.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const subject = `${projectType} inquiry from ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project type: ${projectType}`,
      '',
      form.message,
    ].join('\n');
    const draftUrl = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 450));
      window.location.href = draftUrl;
      setStatus('Your inquiry is prepared in an email draft. Send it from your email app to complete delivery.');
      setForm(initialForm);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'focus-ring w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600';

  return (
    <section
      id="contact"
      className="bg-zinc-50 py-20 text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 sm:py-24"
    >
      <div className="container-shell">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s make your next idea tangible."
          description="Share a little context and I’ll follow up. For a quick start, reach out directly using one of the options below."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <article className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Direct email</p>
              <p className="mt-1 break-all font-semibold">{profile.email}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="focus-ring inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy Email'}
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="focus-ring inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-950"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email me
                </a>
              </div>
            </article>

            <article className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Phone / WhatsApp</p>
              <p className="mt-1 font-semibold">{profile.phone}</p>
              <a
                href={`https://wa.me/${phoneDigits}`}
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-4 inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
              >
                Chat on WhatsApp <Send className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </article>

            <article className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/60 sm:col-span-2 lg:col-span-1">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Location &amp; timezone</p>
                  <p className="mt-1 font-semibold">Faisalabad, Pakistan</p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">PKT (UTC+5)</p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    <Clock3 className="h-3 w-3" aria-hidden="true" /> Local time
                  </p>
                  <time className="mt-1 block font-mono text-sm font-semibold tabular-nums" aria-label="Current time in Pakistan">
                    {localTime}
                  </time>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900/60 sm:p-8" delay={0.08}>
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Name</span>
                  <input required name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Your name" autoComplete="name" />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Email</span>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" autoComplete="email" />
                </label>
              </div>

              <fieldset>
                <legend className="text-sm font-medium">Project type</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      aria-pressed={projectType === type}
                      className={`focus-ring rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
                        projectType === type
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="grid gap-2">
                <span className="text-sm font-medium">Message</span>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  className={`${inputClass} resize-y`}
                  placeholder="What are you looking to build?"
                />
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-wait disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                >
                  {isSubmitting ? 'Preparing email…' : 'Prepare Inquiry'}
                  {!isSubmitting && <Send className="h-4 w-4" aria-hidden="true" />}
                </button>
                {status && (
                  <p role="status" className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                    {status}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
