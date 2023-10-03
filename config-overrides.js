module.exports = function override(config, env) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      fallback: {
        stream: require.resolve("stream-browserify"),
        https: require.resolve("https-browserify"),
        http: require.resolve("stream-http"),
        zlib: require.resolve("browserify-zlib"),
        url: require.resolve("url/"),
        assert: false,
      },
    },
  };
};
