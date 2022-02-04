import Link from 'next/link';

interface Props {
  height: number;
  className?: string;
}

export default function Logo({ height, className }: Props) {
  return (
    <Link href="/" passHref>
      <a>
        <svg
          width={`${height * 2}`}
          height={`${height}`}
          viewBox="0 0 55 24"
          fill="none"
          className={className}
          cursor="pointer"
        >
          <path
            d="M10.6531 5.328L11.3251 4.92C11.4211 4.424 11.2291 4.176 10.7491 4.176C10.0611 4.176 9.71706 4.704 9.71706 5.76C9.71706 6.176 9.77306 6.656 9.88506 7.2C11.1011 8.016 11.7091 9.064 11.7091 10.344C11.7091 11.608 11.2691 12.592 10.3891 13.296C9.50906 14 8.31706 14.352 6.81306 14.352C6.18906 14.352 5.54106 14.288 4.86906 14.16C4.16506 14.608 3.81306 14.944 3.81306 15.168C3.81306 15.392 4.32506 15.504 5.34906 15.504H7.79706C11.4291 15.504 13.2451 16.808 13.2451 19.416C13.2451 20.824 12.6931 21.936 11.5891 22.752C10.5011 23.584 8.79706 24 6.47706 24C2.52506 24 0.549062 23.144 0.549062 21.432C0.549062 20.504 1.16506 19.864 2.39706 19.512L3.83706 20.16C3.70906 20.624 3.64506 21.064 3.64506 21.48C3.64506 22.856 4.66906 23.544 6.71706 23.544C7.96506 23.544 8.92506 23.312 9.59706 22.848C10.2691 22.384 10.6051 21.808 10.6051 21.12C10.6051 20.432 10.3971 19.968 9.98106 19.728C9.58106 19.504 8.77306 19.392 7.55706 19.392H5.22906C3.93306 19.392 3.00506 19.176 2.44506 18.744C1.88506 18.312 1.60506 17.784 1.60506 17.16C1.60506 16.52 1.80506 15.992 2.20506 15.576C2.60506 15.144 3.31706 14.616 4.34106 13.992C2.48506 13.464 1.55706 12.248 1.55706 10.344C1.55706 9.144 1.98906 8.176 2.85306 7.44C3.71706 6.704 5.01306 6.336 6.74106 6.336C7.78106 6.336 8.66906 6.536 9.40506 6.936C9.30906 6.504 9.26106 6.112 9.26106 5.76C9.26106 4.864 9.50106 4.216 9.98106 3.816C10.4611 3.416 10.9971 3.216 11.5891 3.216C12.1811 3.216 12.6531 3.376 13.0051 3.696C13.3731 4 13.5571 4.424 13.5571 4.968C13.5571 5.512 13.4131 5.92 13.1251 6.192C12.8371 6.448 12.4851 6.576 12.0691 6.576C11.6691 6.576 11.3331 6.472 11.0611 6.264C10.8051 6.04 10.6691 5.728 10.6531 5.328ZM5.56506 9.816V11.112C5.56506 12.184 5.65306 12.912 5.82906 13.296C6.02106 13.68 6.30106 13.872 6.66906 13.872C7.05306 13.872 7.32506 13.688 7.48506 13.32C7.66106 12.936 7.74906 12.16 7.74906 10.992V9.816C7.74906 8.568 7.66906 7.752 7.50906 7.368C7.34906 6.968 7.07706 6.768 6.69306 6.768C6.32506 6.768 6.04506 6.976 5.85306 7.392C5.66106 7.792 5.56506 8.6 5.56506 9.816ZM18.7188 12.36H19.4148V10.512C19.4148 8.992 19.3268 7.976 19.1508 7.464C18.9908 6.936 18.6708 6.672 18.1908 6.672C17.9028 6.672 17.6388 6.752 17.3988 6.912C17.1748 7.056 17.0628 7.264 17.0628 7.536C17.0628 7.792 17.1108 8.056 17.2068 8.328H17.8068C17.9348 8.664 17.9988 9.072 17.9988 9.552C17.9988 10.016 17.7988 10.424 17.3988 10.776C16.9988 11.112 16.4948 11.28 15.8867 11.28C14.5108 11.28 13.8228 10.616 13.8228 9.288C13.8228 7.32 15.4948 6.336 18.8388 6.336C20.7428 6.336 22.0548 6.664 22.7748 7.32C23.5108 7.96 23.8788 9.144 23.8788 10.872V15.744C23.8788 16.576 24.1108 16.992 24.5748 16.992C25.1188 16.992 25.4388 16.168 25.5348 14.52L25.8948 14.544C25.8308 15.952 25.5668 16.92 25.1028 17.448C24.6388 17.976 23.8788 18.24 22.8228 18.24C20.9028 18.24 19.7988 17.648 19.5108 16.464C19.3028 17.072 18.9908 17.52 18.5748 17.808C18.1588 18.096 17.5508 18.24 16.7508 18.24C14.3828 18.24 13.1988 17.272 13.1988 15.336C13.1988 14.2 13.6468 13.424 14.5428 13.008C15.4548 12.576 16.8468 12.36 18.7188 12.36ZM17.7588 15.312C17.7588 16.144 17.7988 16.68 17.8788 16.92C17.9748 17.16 18.1428 17.28 18.3828 17.28C18.6388 17.28 18.8708 17.08 19.0788 16.68C19.3028 16.264 19.4148 15.696 19.4148 14.976V12.744H19.2468C18.2548 12.744 17.7588 13.472 17.7588 14.928V15.312ZM26.0346 -1.43051e-06H31.9146V17.568H33.2586V18H26.1306V17.568H27.4506V0.431999H26.0346V-1.43051e-06ZM42.4844 11.544C42.4844 9.896 42.4044 8.792 42.2444 8.232C42.0844 7.656 41.7724 7.368 41.3084 7.368C40.8444 7.368 40.4284 7.672 40.0604 8.28C39.6924 8.872 39.5084 9.672 39.5084 10.68V15.072C39.5084 15.76 39.6444 16.344 39.9164 16.824C40.1884 17.304 40.5884 17.544 41.1164 17.544C41.6444 17.544 42.0044 17.192 42.1964 16.488C42.3884 15.784 42.4844 14.552 42.4844 12.792V11.544ZM39.4604 6.576V8.472C40.0844 7.048 41.1884 6.336 42.7724 6.336C44.1484 6.336 45.2124 6.832 45.9644 7.824C46.7324 8.816 47.1164 10.32 47.1164 12.336C47.1164 14.352 46.7004 15.84 45.8684 16.8C45.0524 17.76 43.8204 18.24 42.1724 18.24C41.4044 18.24 40.8284 18.144 40.4444 17.952C40.0604 17.76 39.7484 17.464 39.5084 17.064V23.28H42.6044V23.712H33.7244V23.28H35.0444V7.008H33.7724V6.576H39.4604ZM51.3618 4.92C50.5138 4.92 49.9058 4.704 49.5378 4.272C49.1858 3.84 49.0098 3.304 49.0098 2.664C49.0098 2.024 49.2018 1.496 49.5858 1.08C49.9858 0.664 50.5858 0.456 51.3858 0.456C52.1858 0.456 52.7938 0.648 53.2098 1.032C53.6258 1.4 53.8338 1.936 53.8338 2.64C53.8338 3.328 53.6338 3.88 53.2338 4.296C52.8338 4.712 52.2098 4.92 51.3618 4.92ZM47.7378 6.576H53.6178V17.568H54.9618V18H47.8338V17.568H49.1538V7.008H47.7378V6.576Z"
            fill="black"
          />
        </svg>
      </a>
    </Link>
  );
}
