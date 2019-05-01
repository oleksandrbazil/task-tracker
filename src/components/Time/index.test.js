import React from 'react';
import Time, { TIME_PLACEHOLDER, TIME_TEST_ID } from './index';
import { render, cleanup } from 'react-testing-library';

afterEach(cleanup);

// We will get console.warn when pass invalid datetime value into Moment.js instance  - it's expected.
// So make mock function to prevent showing long error in test console
jest.spyOn(global.console, 'warn').mockImplementation(() => {});

describe('<Time />', () => {
  describe(`returns ${TIME_PLACEHOLDER}`, () => {
    test('when passed invalid datetime', () => {
      const { getByTestId } = render(<Time datetime={'invalid datetime'} />);
      expect(getByTestId(TIME_TEST_ID)).toHaveTextContent(TIME_PLACEHOLDER);
    });

    test('when passed invalid datetimeDiff object', () => {
      const diff = {
        // start: new Date(),
        // end: null,
      };

      const { getByTestId } = render(<Time datetimeDiff={diff} />);
      expect(getByTestId(TIME_TEST_ID)).toHaveTextContent(TIME_PLACEHOLDER);
    });
  });
});
