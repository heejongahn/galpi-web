declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
}

declare module 'next/config' {
  declare const _default: () => {
    serverRuntimeConfig: {
      KAKAOTALK_REST_API_KEY: string;
    };
    publicRuntimeConfig: {
      HOST: string;
      API_ENDPOINT: string;

      FIREBASE_API_KEY: string;
      FIREBASE_APP_ID: string;
      FIREBASE_PROJECT_ID: string;

      [key: string]: string | undefined;
    };
  };

  export default _default;
}
