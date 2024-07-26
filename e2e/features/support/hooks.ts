import {
  Before,
  BeforeAll,
  AfterAll,
  After,
  ITestCaseHookParameter,
} from '@cucumber/cucumber';
import detox from 'detox/internals.js';

BeforeAll({timeout: 120 * 1000}, async () => {
  await detox.init();

  await device.launchApp({
    permissions: {notifications: 'YES', camera: 'YES', microphone: 'YES'},
  });
});

Before({timeout: 120 * 1000}, async (message: ITestCaseHookParameter) => {
  const {pickle} = message;
  await detox.onTestStart({
    title: pickle.uri,
    fullName: pickle.name,
    status: 'running',
  });
});

After(async (message: ITestCaseHookParameter) => {
  const {pickle, result} = message;
  await detox.onTestDone({
    title: pickle.uri,
    fullName: pickle.name,
    status: result ? 'passed' : 'failed',
  });
});

AfterAll(async () => {
  await detox.cleanup();
});
