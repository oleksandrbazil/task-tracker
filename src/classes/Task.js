export default class Task {
  constructor({ id, name, start, end }) {
    this.id = id;
    this.name = name;
    this.dateStart = new Date(start);
    this.dateEnd = new Date(end);

    // Following format will using in Task Table and Task Info components
    // Maybe the best way is to use momentum.js
    this.timeFormat = date => {
      const twoDigit = i => (i < 10 ? `0${i}` : i);
      return (
        twoDigit(date.getHours()) +
        ':' +
        twoDigit(date.getMinutes()) +
        ':' +
        twoDigit(date.getSeconds())
      );
    };
  }

  get timeStart() {
    return this.timeFormat(this.dateStart);
  }

  get timeEnd() {
    return this.timeFormat(this.dateEnd);
  }

  get timeSpent() {
    const spent = this.dateEnd - this.dateStart;
    // we have to correct spent time with timezone offset
    const timezoneDelta = new Date().getTimezoneOffset() * 60000;
    return this.timeFormat(new Date(spent + timezoneDelta));
  }
}
