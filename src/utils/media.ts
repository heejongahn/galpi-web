export type Breakpoint = 'md' | 'xl';

export const breakpoints: { [key in Breakpoint]: number } = {
  md: 768,
  xl: 1200,
};

export function getBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') {
    return 'md';
  }

  const breakpointValues = (Object.keys(breakpoints) as Breakpoint[])
    .map((key) => [key, breakpoints[key]] as const)
    .sort((a, b) => b[1] - a[1]);

  for (const [key, value] of breakpointValues) {
    if (value <= window.innerWidth) {
      return key;
    }
  }

  return 'md';
}
