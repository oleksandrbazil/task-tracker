import { TIME_PLACEHOLDER, prettyTime, prettyTimeDiff } from './index';

// We will get console.warn when pass invalid datetime value into Moment.js instance  - it's expected behaviour.
// Make mock function to prevent showing warnings while testing.
jest.spyOn(global.console, 'warn').mockImplementation(() => {});

describe('prettyTime', () => {
  describe(`prettyTime returns ${TIME_PLACEHOLDER}`, () => {
    test(`when invalid datetime`, () => {
      const str = prettyTime('invalid datetime');
      expect(str).toBe(TIME_PLACEHOLDER);
    });
  });

  describe(`prettyTimeDiff returns ${TIME_PLACEHOLDER}`, () => {
    test(`when invalid number of arguments`, () => {
      const str = prettyTimeDiff('invalid datetime');
      expect(str).toBe(TIME_PLACEHOLDER);
    });

    test(`when invalid datetime`, () => {
      const now = new Date();
      const str = prettyTimeDiff(now, 'some invalid datetime');
      expect(str).toBe(TIME_PLACEHOLDER);
    });
  });
});
