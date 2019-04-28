import moment from 'moment';

export const buildData = (taskArray = [], simultaneous = false) => {
  const HOURS_IN_DAY = 24;
  const MAX_TOTAL = 60; // minutes in hour
  let data = [];

  // We would like to use class DataItem to make sure all values always will be saved as Numbers
  class DataItem {
    constructor({ name }) {
      this.name = name;
      // We will use total value to ensure this timeslot still have available time in DataItems
      this.total = 0;
    }
    setTotal(total) {
      this.total = Number(total);
    }
    get getTotal() {
      return Number(this.total);
    }
    get getAvailable() {
      return Number(MAX_TOTAL - this.getTotal);
    }
    setItem(name, value) {
      this[name] = Number(value).toFixed(2);
    }
  }

  // 1. Build basic data array with 24 items for each hour
  for (let i = 0; i < HOURS_IN_DAY; i++) {
    const name = moment
      .utc()
      .hours(i)
      .minutes(0)
      .format('HH:mm');

    data.push(new DataItem({ name }));
  }

  // 2. Loop trough the task array
  taskArray.forEach(({ name, start, end }) => {
    // Do nothing if there is no required fields
    if (!name || !start || !end) {
      return;
    }
    const startedAt = moment(start);
    const finishedAt = moment(end);
    let targetDataItemIndex = moment(startedAt).hours();
    const spentHours = finishedAt.diff(startedAt, 'hours');
    let spent = finishedAt.diff(startedAt, 'minutes');

    // We want to use loop through the dataItems (hours)
    // to make sure CurrentTask with spent time more than 1 hour will be filled into the next dataItem (hour)
    for (let index = 0; index <= spentHours; index++) {
      targetDataItemIndex += index;

      // If dataItem (hour) doesn't exist we will start filling spent time into the first dataItem (hour)
      // This should cover case when we trying to fill 25:00 hour which means 00:00
      // So reduce targetDataItemIndex by HOURS_IN_DAY
      targetDataItemIndex -=
        targetDataItemIndex >= HOURS_IN_DAY ? HOURS_IN_DAY : 0;

      let dataItem = data[targetDataItemIndex];

      if (simultaneous) {
        if (spent >= MAX_TOTAL) {
          dataItem.setItem(name, MAX_TOTAL);
          spent = Number(spent - MAX_TOTAL);
        } else {
          dataItem.setItem(name, spent);
        }
      } else {
        let available = dataItem.getAvailable;
        if (spent <= available) {
          dataItem.setTotal(dataItem.getTotal + spent);
          dataItem.setItem(name, spent);
        } else if (spent > available && dataItem.getAvailable !== 0) {
          dataItem.setTotal(MAX_TOTAL);
          dataItem.setItem(name, available);
          spent = Number(spent - available);
        } else {
          // There is no available time and CurrentTask is overriding another task,
          // we won't show CurrentTask in NON 'simultaneous' mode so remove CurrentTask from array.
          // This shouldn't happen in real data flow, only for random generated task array
          return;
        }
      }
    }
  });

  return data;
};

export default buildData;
