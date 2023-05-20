/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        domains: ['avatars.githubusercontent.com','cdn.iconscout.com'],
    },
}

module.exports = nextConfig
