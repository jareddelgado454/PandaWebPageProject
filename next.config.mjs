/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['d3nqi6yd86hstw.cloudfront.net']
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback.fs = false
          config.resolve.fallback.tls = false
          config.resolve.fallback.net = false
          config.resolve.fallback.child_process = false
        }
    
        return config
    },
};

export default nextConfig;
