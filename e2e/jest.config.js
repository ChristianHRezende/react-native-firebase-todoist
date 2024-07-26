const {pathsToModuleNameMapper} = require('ts-jest');

const tsConfig = require('../tsconfig');

const {resolveConfig} = require('detox/internals');
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = async () => {
  /** @type {DetoxInternals.RuntimeConfig} */
  const config = await resolveConfig();

  return {
    ...config,
    preset: 'ts-jest',
    rootDir: '..',
    testMatch: ['<rootDir>/e2e/**/*.test.ts'], // (2)
    testTimeout: 120000,
    maxWorkers: 1,
    moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
    globalSetup: 'detox/runners/jest/globalSetup',
    globalTeardown: 'detox/runners/jest/globalTeardown',
    reporters: ['detox/runners/jest/reporter'],
    testEnvironment: 'detox/runners/jest/testEnvironment',
    verbose: true,
  };
};
