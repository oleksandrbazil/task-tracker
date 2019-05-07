import moment from 'moment';

export const HOURS_IN_DAY = 24;
const MILLISECONDS_IN_MINUTE = 60 * 1000;

class BarItem {
  constructor({ id, stackId }) {
    this.id = id;
    this.stackId = stackId ? 'allInOne' : null;
    this.fill = `#${Math.random()
      .toString(16)
      .substr(-6)}`;
  }
}

// Use Class to make sure all props will be accessible and task spent time will be saved correctly
class TimeSlot {
  constructor({ hours }) {
    this.min = moment()
      .utc()
      .set({
        hours,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    this.max = moment()
      .utc()
      .set({
        hours: hours + 1,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    this.name = this.min.format('HH:mm');
    this.intervals = [];
  }

  /**
   * addSpentTime just adding new task item into Time Slot
   * @param taskId - must be unique id
   * @param millisecondsSpent - timestamp in milliseconds, will be convertet into minutes
   */
  addSpentTime(taskId, millisecondsSpent) {
    this[taskId] = Number(millisecondsSpent / MILLISECONDS_IN_MINUTE).toFixed(
      2
    );
  }
}

/**
 * buildChartData function is help to build required data array for ReCharts feature.
 * @param tasks - array of tasks with props {id,name,start,end}
 * @param overlayMode - Boolean.
 * @returns {Object} with data and bars arrays
 */
export const buildChartData = (tasks = [], overlayMode = false) => {
  let returnData = {
    data: [],
    bars: [],
  };

  // 1. Build basic data array with 24 items for each hour
  for (let hours = 0; hours < HOURS_IN_DAY; hours++) {
    returnData.data.push(new TimeSlot({ hours }));
  }

  // 2. Loop trough the task array
  tasks.forEach(({ id, name, start, end }) => {
    // 1. SMALL VALIDATION
    // 1.1 - Skip Current Task if there is no required task props
    if (!id || !name || !start || !end) {
      return;
    }
    const startedAt = moment(start);
    const finishedAt = moment(end);

    // 1.2 - Skip Current Task if there is invalid datetime
    if (!startedAt.isValid() || !finishedAt.isValid()) {
      return;
    }

    // 2. PREPARE DATA
    const startHour = startedAt.hours();
    const finishHour = finishedAt.hours();
    let spentHours = 1; //we will going trough the loop so it's important to have value more than 0

    // Define correct number of hours which are related to the current Task
    if (finishHour > startHour) {
      spentHours += finishHour - startHour;
    } else if (finishHour < startHour) {
      // Here we calculate hours for task which are going trough the middle of the night
      // (Task was started today and will be finished technically tomorrow)
      spentHours += HOURS_IN_DAY + finishHour - startHour;
    }

    // 3. LOOP THROUGH THE TASK SPENT HOURS
    for (let hour = 0; hour < spentHours; hour++) {
      // We have to select correct Time Slot by targetHour to make sure put values into correspond Time Slot
      // We also need to cover case when index increase up to 24  => reset to 0
      let targetHour = startHour + hour;
      targetHour -= targetHour >= HOURS_IN_DAY ? HOURS_IN_DAY : 0;

      const taskSlotName = moment
        .utc()
        .hours(targetHour)
        .minutes(0)
        .format('HH:mm');

      let slot = returnData.data.find(slot => slot.name === taskSlotName);

      // Skip Current Task if TimeSlot is not found. Should never happen
      if (!slot) {
        return;
      }

      // Let's prepare datetime values for comparing.
      // It's important to use UTC datetime
      const min = slot.min;
      const max = slot.max;

      let start = moment(slot.min).set({
          hour: startedAt.hours(),
          minute: startedAt.minutes(),
          second: startedAt.seconds(),
          milliseconds: startedAt.milliseconds(),
        }),
        finish = moment(slot.min).set({
          hour: finishedAt.hours(),
          minute: finishedAt.minutes(),
          second: finishedAt.seconds(),
          milliseconds: finishedAt.milliseconds(),
        });

      // We have to limit start and finish values by current time slot
      start = start <= min || start > max ? min : start;
      finish = finish <= min || finish > max ? max : finish;

      // Count difference in milliseconds
      const spentMilliseconds = finish.valueOf() - start.valueOf();

      // 3. If it's DEFAULT mode, we have to care about task overlays, if there is one of them we will remove Overlay Task from an array
      if (!overlayMode) {
        let isOverlay = false;
        slot.intervals.forEach(interval => {
          const a =
            start.valueOf() >= interval.start &&
            start.valueOf() <= interval.finish;
          const b =
            finish.valueOf() >= interval.start &&
            finish.valueOf() <= interval.finish;
          if (a || b) {
            isOverlay = true;
          }
        });

        // Skip Current Task because it's overlay on the timeline of another Task
        if (isOverlay) {
          return;
        }

        slot.intervals.push({
          id,
          start: start.valueOf(),
          finish: finish.valueOf(),
          spentMilliseconds,
        });
      }

      // Finally, add task item
      slot.addSpentTime(id, spentMilliseconds);
    }

    // Add task item into bar array. If it's DEFAULT mode we would like to show all TimeSlot spent time in one Bar
    returnData.bars.push(new BarItem({ id, stackId: !overlayMode }));
  });

  return returnData;
};

export default buildChartData;
