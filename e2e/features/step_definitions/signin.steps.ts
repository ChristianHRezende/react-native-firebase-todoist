import {Given, Then, When} from '@cucumber/cucumber';
import detox from 'detox';
import home from '../../screens/home.ts';
import signIn from '../../screens/signIn.ts';
import welcome from '../../screens/welcome.ts';

interface ScenarioData {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

Given(
  "I'm a registered user",
  {timeout: 3000},
  async function (this: ScenarioData) {
    this.user = {
      username: 'Richard Riley',
      email: 'ojzaf@wa.gn',
      password: '1XQAvffdKLri',
    };
    return 'passed';
  },
);

When('access the signIn formulary', {timeout: 3000}, async function () {
  await welcome.pressAlreadyHaveAnAccountButton();
  return 'passed';
});

When(
  'fill the signIn formulary with valid email and password',
  {timeout: 5000},
  async function (this: ScenarioData) {
    await signIn.fillFormulary(this.user);
    return 'passed';
  },
);

When(
  'submit the signIn formulary',
  {timeout: 3000},
  async function (this: ScenarioData) {
    await signIn.pressSubmitButton();
    return 'passed';
  },
);

Then(
  "I'm redirected to the home screen",
  {timeout: 3000},
  async function (this: ScenarioData) {
    await detox
      .waitFor(detox.element(detox.by.text(home.HEADER_TITLE_TEXT)))
      .toExist()
      .withTimeout(2000);
    return 'passed';
  },
);
