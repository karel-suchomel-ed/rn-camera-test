module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-worklets-core/plugin'],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src/'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
}
