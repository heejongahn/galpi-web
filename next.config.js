const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');

require('dotenv').config();

module.exports = withPlugins([withSass()], {
  distDir: 'build',
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
});
