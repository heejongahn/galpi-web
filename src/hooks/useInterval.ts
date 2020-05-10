import { useEffect, useRef } from 'react';

export default function useInterval(callback: () => any, delay: number | null) {
  const savedCallback = useRef<() => any>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
