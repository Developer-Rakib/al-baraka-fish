/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: ['i.ibb.co'], // Add the external hostname here
    },
}

export default nextConfig;
