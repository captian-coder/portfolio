import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds, offset = 140) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const current = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          return { id, top: element.getBoundingClientRect().top };
        })
        .filter(Boolean)
        .reverse()
        .find((section) => section.top <= offset);

      if (current) setActiveId(current.id);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, sectionIds]);

  return activeId;
}
