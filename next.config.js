const { i18n } = require('./next-i18next.config');

const withPWA = require('next-pwa')({
  dest: 'public',
});
/** @type {import('next').NextConfig} */

module.exports = withPWA({
  i18n,
  reactStrictMode: true,
  swcMinify: true,
});
