/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                pathname: '/**', // Chấp nhận mọi đường dẫn dưới domain này
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**', // Chấp nhận mọi đường dẫn dưới domain này
            },
        ],
        domains: ['res.cloudinary.com'],
    },
};

module.exports = nextConfig;
