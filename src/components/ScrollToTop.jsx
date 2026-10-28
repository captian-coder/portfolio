import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 520);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="#home"
      className={`focus-ring fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-coral text-white shadow-premium transition duration-300 hover:-translate-y-1 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      aria-label="Scroll back to top"
    >
      <FiArrowUp className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
