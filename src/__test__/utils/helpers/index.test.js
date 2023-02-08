import {
  capitalizeFirstLetter,
  divideSpaceIdCard,
  formatPhoneVN,
  get4LastDigit,
  isNumber,
  parseMoneyVnd,
  removeNonNumeric,
} from 'utils/helpers';

describe('Test capitalizeFirstLetter function', () => {
  it('Test param', () => {
    expect(capitalizeFirstLetter('capitalizeFirstLetter')).toEqual(
      'Capitalizefirstletter'
    );
  });
});

describe('Test isNumber function', () => {
  it('Test param', () => {
    expect(isNumber(100)).toEqual(true);
  });
  test('Test number is a string', () => {
    expect(isNumber('200')).toEqual(true);
  });
  test('Test is not a number', () => {
    expect(isNumber('fafas')).toEqual(false);
  });
});

describe('Test parseMoneyVnd function', () => {
  it('Test param', () => {
    expect(parseMoneyVnd(100000)).toEqual('100 000');
  });
  test('Test param is not a number', () => {
    expect(parseMoneyVnd('string')).toEqual('');
  });
});

describe('Test removeNonNumeric function', () => {
  it('Test param', () => {
    expect(removeNonNumeric('100 000')).toEqual('100000');
  });
  test('Test param is not a number', () => {
    expect(removeNonNumeric('string')).toEqual('');
  });
});

describe('Test divideSpaceIdCard function', () => {
  it('Test param', () => {
    expect(divideSpaceIdCard('10400202')).toEqual('1040 0202 ');
  });
});

describe('Test get4LastDigit function', () => {
  it('Test param', () => {
    expect(get4LastDigit('10400202')).toEqual('0202');
  });
});

describe('Test formatPhoneVN function', () => {
  it('Test param', () => {
    expect(formatPhoneVN('0813908117')).toEqual('+84813908117');
  });
});
