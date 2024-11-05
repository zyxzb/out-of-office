import { useEffect, useRef } from 'react';

const useClickOutside = <T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true,
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return { ref };
};

export default useClickOutside;
