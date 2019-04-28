import React from 'react';
import moment from 'moment';

const TIME_FORMAT = 'HH:mm:ss';

const Time = ({ datetime, secondDatetime, diff }) => {
  let timeString = '00:00:00';

  if (diff) {
    // We have to calculate difference between two datetimes and show time in required time format
    const start = moment(datetime);
    const finish = moment(secondDatetime);
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

  return <>{timeString}</>;
};

Time.defaultProps = {
  diff: false,
};

export default Time;
