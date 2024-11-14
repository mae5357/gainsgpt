const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.cache = false; // Disable Webpack caching
      }
      return config;
    },
  };
  
  export default nextConfig;
  