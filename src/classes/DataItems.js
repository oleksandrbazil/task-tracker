import moment from 'moment';

const HOURS_IN_DAY = 24;
const MAX_TOTAL = 60; // minutes in hour

class DataItem {
  constructor({ name }) {
    this.name = name;
    // We would like to use Total item to make sure each task
    this.total = 0;
  }

  setTotal(total) {
    this.total = Number(total).toFixed(2);
  }

  get getTotal() {
    return Number(this.total);
  }

  setItem(name, value) {
    this[name] = Number(value).toFixed(2);
  }
}

export default class DataItems {
  constructor(tasks = []) {
    this.tasks = tasks;
    this.data = [];

    // build basic data array
    for (let i = 0; i < HOURS_IN_DAY; i++) {
      const name = moment
        .utc()
        .hours(i)
        .minutes(0)
        .format('HH:mm');
      this.data.push(new DataItem({ name }));
    }
  }

  /**
   * The simpleData getter returns data object for BarChart.
   * This function is support real life case when only one task could be at the same time
   * @returns {*[]}
   */
  get getData() {
    let simpleData = [].concat(this.data);

    this.tasks.forEach(task => {
      const startedAt = moment(task.start);
      const finishedAt = moment(task.end);
      const startHours = moment(startedAt).hours();
      const spentHours = finishedAt.diff(startedAt, 'hours');
      let spent = finishedAt.diff(startedAt, 'minutes');

      for (let index = 0; index <= spentHours; index++) {
        let targetHour = startHours + index;

        // We have to cover case when target hour doesn't exist,
        // it means task pass to the new day, so reduce hours by 24
        targetHour -= targetHour >= HOURS_IN_DAY ? HOURS_IN_DAY : 0;

        let dataItem = simpleData[targetHour];
        let available = Number(MAX_TOTAL - dataItem.getTotal);

        if (available <= 0) {
          // Actually, this case should never happen in real life because there is only one task at the same time.
          // Skip this task at all
          return;
        } else if (available <= spent) {
          dataItem.setTotal(MAX_TOTAL);

          dataItem.setItem(task.name, available);
          spent = Number(spent - available);
        } else {
          dataItem.setTotal(dataItem.getTotal + spent);
          dataItem.setItem(task.name, spent);
        }
      }
    });

    return simpleData;
  }

  /**
   * The getSimultaneousData getter based on the 'simpleData' getter with ability to support simultaneous tasks (several tasks at the same time),
   * The 'simultaneous' feature required only for Random Generator feature
   * Check TaskChart.jsx for details
   * @returns {*[]}
   */
  get getSimultaneousData() {
    let getSimultaneousData = [].concat(this.data);

    this.tasks.forEach(task => {
      const startedAt = moment(task.start);
      const finishedAt = moment(task.end);
      const startHours = moment(startedAt).hours();
      const spentHours = finishedAt.diff(startedAt, 'hours');
      let spent = finishedAt.diff(startedAt, 'minutes');

      // addition variable for simultaneous tasks
      let simultaneous = false;

      for (let index = 0; index <= spentHours; index++) {
        let targetHour = startHours + index;

        // We have to cover case when target hour doesn't exist,
        // it means task pass to the new day, so reduce hours by 24
        targetHour -= targetHour >= HOURS_IN_DAY ? HOURS_IN_DAY : 0;

        let dataItem = getSimultaneousData[targetHour];
        let available = Number(MAX_TOTAL - dataItem.getTotal);

        // Here is additional check for simultaneous tasks
        if (available <= 0 || simultaneous) {
          // Here is required code for simultaneous tasks
          simultaneous = true;
          if (spent >= MAX_TOTAL) {
            dataItem.setItem(task.name, MAX_TOTAL);
            spent = Number(spent - MAX_TOTAL);
          } else {
            dataItem.setItem(task.name, spent);
            simultaneous = false;
          }
        } else if (available <= spent) {
          dataItem.setTotal(MAX_TOTAL);

          dataItem.setItem(task.name, available);
          spent = Number(spent - available);
        } else {
          dataItem.setTotal(dataItem.getTotal + spent);
          dataItem.setItem(task.name, spent);
        }
      }
    });

    return getSimultaneousData;
  }
}
