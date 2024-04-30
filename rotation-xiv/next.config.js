const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, swcMinify: true }

module.exports = withContentlayer(nextConfig)

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
