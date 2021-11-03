module.exports = {
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mock__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mock__/fileMock.js'
  },
  moduleDirectories: ['node_modules', '.'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['./setupTest.ts']
};
