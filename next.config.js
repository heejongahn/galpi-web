const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');

require('dotenv').config();

module.exports = withPlugins([withSass()], {
  distDir: 'build',
});
