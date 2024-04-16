// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Handling Babel transformations
    },
    moduleNameMapper: {
      // Mocks out all these file formats when testing
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
  };
  