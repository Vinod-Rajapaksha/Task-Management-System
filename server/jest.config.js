export default {
  testEnvironment: "node",

  transform: {
    "^.+\\.js$": "babel-jest",
  },

  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setup/jest.setup.js",
  ],

  collectCoverage: true,
};