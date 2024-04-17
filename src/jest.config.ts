// jest.config.js
module.exports = {
  preset: 'ts-jest',  // Using ts-jest preset
  testEnvironment: 'jsdom',  // Setting environment to jsdom for DOM manipulation
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Transform TypeScript files using ts-jest
    '^.+\\.(js|jsx)$': 'babel-jest',  // Transform JavaScript files using babel-jest (if needed)
  },
  moduleNameMapper: {
    // Add if you have styles or assets being imported in your components
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Setup files for jest-dom
};