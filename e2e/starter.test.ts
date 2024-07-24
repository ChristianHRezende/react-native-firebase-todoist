import {device, element, by, waitFor} from 'detox';
import {signUp} from '@/services';
jest.mock('@react-native-firebase/auth', () => ({
  currentUser: {
    email: 'cos@heebe.it',
    signInWithEmailAndPassword: jest.fn().mockResolvedValue(true),
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue(true),
  },
}));
jest.mock('@/services');
const signUpFake = signUp as jest.Mock;

describe('Welcome', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  async function navigateSignUpForm() {
    const signUpButton = element(by.text('Get Started'));
    await signUpButton.tap();
    const signUpConfirmButton = element(by.text('Confirm'));
    await waitFor(signUpConfirmButton).toExist().withTimeout(2000);
  }
  it('should open the sign in form', async () => {
    await navigateSignUpForm();
  });

  it('should fill sign up form', async () => {
    signUpFake.mockResolvedValue(true);
    await navigateSignUpForm();
    const signUpInputName = element(by.id('name'));
    const signUpInputEmail = element(by.id('email'));
    const signUpInputCPF = element(by.id('cpf'));
    const signUpInputPassword = element(by.id('password'));
    await signUpInputName.typeText('Richard Riley');
    await signUpInputEmail.typeText('ojzaf@wa.gn');
    await signUpInputCPF.typeText('223.948.210-94');
    await signUpInputPassword.typeText('1XQAvffdKLri');
    const signUpConfirmButton = element(by.text('Confirm'));
    await signUpConfirmButton.tap();
  });
});
