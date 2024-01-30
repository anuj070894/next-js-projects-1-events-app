/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
            }, {
                protocol: 'https',
                hostname: 'wembleypark.com',
                port: '',
            },
        ],
    }
};

export default nextConfig;
