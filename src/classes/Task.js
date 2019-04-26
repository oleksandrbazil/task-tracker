import moment from 'moment';

const TIME_FORMAT = 'HH:mm:ss';

export default class Task {
  constructor({ id, name, start = new Date(), end = new Date() }) {
    this.id = id;
    this.name = name;
    this.startMoment = moment(start);
    this.finishMoment = moment(end);
  }

  get timeStart() {
    return this.startMoment.format(TIME_FORMAT);
  }

  get timeEnd() {
    return this.finishMoment.format(TIME_FORMAT);
  }

  get timeSpent() {
    const spent = moment.utc(this.finishMoment.diff(this.startMoment));

    return spent.isValid() ? spent.format(TIME_FORMAT) : '00:00:00';
  }

  get startHours() {
    return moment(this.startMoment).hours();
  }

  spent(unit) {
    return this.finishMoment.diff(this.startMoment, unit);
  }
}
