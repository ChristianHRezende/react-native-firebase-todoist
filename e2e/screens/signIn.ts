const INPUT_EMAIL_TEST_ID = 'inputEmail';
const INPUT_PASSWORD_TEST_ID = 'inputPassword';
const SUBMIT_BUTTON_TEST_ID = 'submitButton';
async function pressSubmitButton() {
  await detox.element(detox.by.id(SUBMIT_BUTTON_TEST_ID)).tap();
}
async function fillFormulary(user: {email: string; password: string}) {
  const inputEmail = detox.element(detox.by.id(INPUT_EMAIL_TEST_ID));
  const inputPassword = detox.element(detox.by.id(INPUT_PASSWORD_TEST_ID));
  await inputEmail.typeText(user.email);
  await inputPassword.typeText(user.password);
}
export default {
  INPUT_EMAIL_TEST_ID,
  INPUT_PASSWORD_TEST_ID,
  SUBMIT_BUTTON_TEST_ID,
  pressSubmitButton,
  fillFormulary,
};
