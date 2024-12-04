module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        globals: ['__scanCodes'],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
        },
      },
    ],
    'jest-hoist',
    'nativewind/babel',
    'react-native-reanimated/plugin',
  ],
};
