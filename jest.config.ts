module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Allow path aliases from tsconfig.json
  },
  // setupFilesAfterEnv: ["./tests/setup.ts"], // Optional: if you need setup for tests
};
