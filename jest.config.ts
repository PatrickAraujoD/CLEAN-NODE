import type {Config} from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir/src/**/*.ts>"],
  collectCoverage: true,
  testEnvironment: "node",
  preset: '@shelf/jest-mongodb',
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};

export default config;
