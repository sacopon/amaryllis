module.exports = {
  roots: ["<rootDir>/src"],
  moduleDirectories: ["src", "node_modules"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts||js)$": "ts-jest",
  },
};
