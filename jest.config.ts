module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.js', '**/*.test.ts', '**/**/*.test.ts'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
  },
  testTimeout: 9000000,
};
