import moment from 'moment';

const TIME_FORMAT = 'HH:mm:ss';
export const TIME_PLACEHOLDER = '00:00:00';

/**
 *
 * @param datetime
 * @returns {string}
 */
export const prettyTime = datetime => {
  let timeString = TIME_PLACEHOLDER;
  const start = moment(datetime);
  if (start.isValid()) {
    timeString = start.format(TIME_FORMAT);
  }
  return timeString;
};

/**
 *
 * @param startDatetime
 * @param finishDatetime
 * @returns {string}
 */
export const prettyTimeDiff = (startDatetime, finishDatetime) => {
  let timeString = TIME_PLACEHOLDER;
  const start = moment(startDatetime);
  const finish = moment(finishDatetime);

  if (start.isValid() && finish.isValid()) {
    timeString = moment.utc(finish.diff(start)).format(TIME_FORMAT);
  }
  return timeString;
};
