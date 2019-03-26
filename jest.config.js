module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/src/store/store.js',
    '!**/src/App.vue',
    '!**/src/main.js',
    '!**/src/router.js',
    '!**/node_modules/**',
    '!**/vue.config.js',
    '!**/jest.config.js',
    '!**/babel.config.js',
    '!**/postcss.config.js',
    '!**/tests/unit/**',
    '!**/coverage/**',
    '!<rootDir>/.eslintrc.js',
    '!<rootDir>/.prettierrc.js'
  ],
  coverageReporters: ['html', 'text-summary'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/'
}
