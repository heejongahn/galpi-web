declare module '*.scss' {
  const styles: { [className: string]: string };

  export const className: string;
  export default styles;
}
