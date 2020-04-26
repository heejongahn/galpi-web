declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }

  interface ProcessEnv {
    HOST: string;
    API_ENDPOINT: string;
    [key: string]: string | undefined;
  }
}
