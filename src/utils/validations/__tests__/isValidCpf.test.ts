import isValidCPF from '../isValidCpf';

it('must return false for a invalid cpf', () => {
  const cpf = '1231233532';
  const isValid = isValidCPF(cpf);
  expect(isValid).toBeTruthy();
});

it('must return true for a valid cpf', () => {
  const cpf = '78464064004';
  const isValid = isValidCPF(cpf);
  expect(isValid).toBeTruthy();
});
