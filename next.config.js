require('dotenv').config();

module.exports = {
  distDir: 'build',
  serverRuntimeConfig: {
    KAKAOTALK_REST_API_KEY: process.env.KAKAOTALK_REST_API_KEY,
  },
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    API_ENDPOINT: process.env.API_ENDPOINT,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  },
};
