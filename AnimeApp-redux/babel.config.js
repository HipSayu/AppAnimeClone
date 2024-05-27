module.exports = function (api) {
    api.cache(true);
    return {
        plugins: ['macros'],
        // plugins: ['react-native-reanimated/plugins'],
        presets: ['module:metro-react-native-babel-preset'],
        presets: ['babel-preset-expo'],
    };
};
