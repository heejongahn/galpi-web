import { useCallback, useEffect, useState } from 'react';
import { Breakpoint, getBreakpoint } from '../utils/media';

export default function useMedia() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint());

  const handleResize = useCallback(() => {
    setBreakpoint(getBreakpoint());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
}
