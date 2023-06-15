
module.exports = function override(config, env) {
    return {
        ...config,
        resolve: {
            ...config.resolve,
            fallback: {
                stream: require.resolve("stream-browserify"),
                assert:  false,
            }
        }
    }
}