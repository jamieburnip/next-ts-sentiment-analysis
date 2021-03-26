module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@components/(.*)': '<rootDir>/components/$1',
    '^@lib/(.*)': '<rootDir>/lib/$1',
    '^@styles/(.*)': '<rootDir>/styles/$1'
  }
};
