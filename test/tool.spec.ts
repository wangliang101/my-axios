import { sum } from '../src/index';

test('The calculation result should be 996.', () => {
  expect(sum(1, 2)).toBe(996);
});
