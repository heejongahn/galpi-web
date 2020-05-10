declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
}

declare module 'next/config' {
  declare const _default: () => {
    serverRuntimeConfig: {};
    publicRuntimeConfig: {
      HOST: string;
      API_ENDPOINT: string;
      [key: string]: string | undefined;
    };
  };

  export default _default;
}
