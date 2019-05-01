import React from 'react';
import moment from 'moment';

const TIME_FORMAT = 'HH:mm:ss';
export const TIME_PLACEHOLDER = '00:00:00';
export const TIME_TEST_ID = 'time';

const defaultDateTimeDiff = {
  start: '',
  end: '',
};

const Time = ({ datetime, secondDatetime, datetimeDiff }) => {
  let timeString = TIME_PLACEHOLDER;

  if (datetimeDiff && datetimeDiff !== defaultDateTimeDiff) {
    // We have to calculate difference between two datetime and show time in required time format
    const { start: startDatetime, end: finishDatetime } = datetimeDiff;
    const start = moment(startDatetime);
    const finish = moment(finishDatetime);
    if (start.isValid() && finish.isValid()) {
      timeString = moment.utc(finish.diff(start)).format(TIME_FORMAT);
    }
  } else if (datetime) {
    // Show datetime in required time format
    const start = moment(datetime);
    if (start.isValid()) {
      timeString = start.format(TIME_FORMAT);
    }
  }

  return <span data-testid={TIME_TEST_ID}>{timeString}</span>;
};

Time.defaultProps = {
  datetime: '',
  datetimeDiff: defaultDateTimeDiff,
};

export default Time;
