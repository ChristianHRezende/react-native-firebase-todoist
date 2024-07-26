const GET_STARTED_BUTTON_TEXT = 'Get Started';
const ALREADY_HAVE_AN_ACCOUNT_BUTTON_TEXT = 'Already have an account?';

async function pressAlreadyHaveAnAccountButton() {
  await detox.element(detox.by.text(ALREADY_HAVE_AN_ACCOUNT_BUTTON_TEXT)).tap();
}

export default {
  GET_STARTED_BUTTON_TEXT,
  ALREADY_HAVE_AN_ACCOUNT_BUTTON_TEXT,
  pressAlreadyHaveAnAccountButton,
};
