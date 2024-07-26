import capitalize from '../capitalize';

it('must capitalize the string', () => {
  const expectedResult = 'Email';
  const param = 'email';
  const result = capitalize(param);
  expect(result).toEqual(expectedResult);
});

it('must capitalize an empty string', () => {
  const expectedResult = '';
  const param = '';
  const result = capitalize(param);
  expect(result).toEqual(expectedResult);
});
