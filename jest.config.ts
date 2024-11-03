module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/test/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Allow path aliases from tsconfig.json
  },
  // setupFilesAfterEnv: ["./tests/setup.ts"], // Optional: if you need setup for tests
};
