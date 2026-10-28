import { education } from '../data/portfolio.js';
import SectionHeader from './SectionHeader.jsx';
import Timeline from './Timeline.jsx';

export default function Education() {
  return (
    <section id="education" className="section-padding bg-zinc-50 dark:bg-zinc-900/40">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Education"
          title="Academic foundation for software engineering."
          description="Core studies in programming, databases, web systems, software engineering principles, and user-centered product thinking."
        />
        <Timeline items={education} />
      </div>
    </section>
  );
}
