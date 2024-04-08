import {isValidPassword} from '../isValidPassword';

it('should not allow a password with length less than 8 chars', () => {
  const password = '1234Cas';
  const isValid = isValidPassword(password);
  expect(isValid).toBeFalsy();
});

it('should not allow a password without capital letters', () => {
  const password = '1234case';
  const isValid = isValidPassword(password);
  expect(isValid).toBeFalsy();
});

it('should not allow a password without numbers', () => {
  const password = 'sdwccase';
  const isValid = isValidPassword(password);
  expect(isValid).toBeFalsy();
});
