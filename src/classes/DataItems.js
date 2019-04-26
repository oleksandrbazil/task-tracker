import Task from './Task';

const HOURS_IN_DAY = 24;
const MAX_TOTAL = 60; // minutes in hour

class DataItem {
  constructor({ name }) {
    this.name = name;
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
  constructor(tasks) {
    this.data = [];

    // build basic data array
    for (let i = 0; i < HOURS_IN_DAY; i++) {
      this.data.push(new DataItem({ name: i }));
    }

    tasks.forEach(item => {
      const task = new Task(item);
      const startHours = task.startHours;
      const spentHours = task.spent('hours');
      let spent = task.spent('minutes');

      for (let index = 0; index <= spentHours; index++) {
        // We want to access data item by index in array instead of loop through the object to find required dataItem
        // that's why index decrement by 1
        let targetHour = startHours + index - 1;

        // We have to cover case when target hour doesn't exist,
        // it means task pass to the new day, so reduce hours by 24
        targetHour -= targetHour >= HOURS_IN_DAY ? HOURS_IN_DAY : 0;

        let dataItem = this.data[targetHour];
        let available = Number(MAX_TOTAL - dataItem.getTotal);

        if (available <= 0) {
          // Meaning there is no any empty time slots.
          // This could happen when there are a lot of paralel tasks or different task in different days
          // This part of code doesn't support it, do something later
          // debugger;
        } else if (available <= spent) {
          dataItem.setTotal(MAX_TOTAL);

          dataItem.setItem(task.name, available);
          dataItem.setItem(task.id, available);
        } else {
          dataItem.setTotal(dataItem.getTotal + spent);
          dataItem.setItem(task.name, spent);
        }
      }
    });
  }
}
