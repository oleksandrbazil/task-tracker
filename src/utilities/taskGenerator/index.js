const MIN_TASKS = 10; // items
const MAX_TASKS = 15; // items
const MIN_DURATION = 10; // minutes
const MAX_DURATION = 90; // minutes

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 *
 * @param oneByOne - boolean. Make possible generate random tasks one by one without delays
 * @returns {Array}
 */
export const generateRandom = (oneByOne = false) => {
  let tasks = [];
  const now = new Date();
  const today = new Date(now.toLocaleDateString());
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
  const numberOfTasks = getRandomInt(MIN_TASKS, MAX_TASKS);

  for (let id = 1; id < numberOfTasks; id++) {
    let start = getRandomInt(today.valueOf(), tomorrow.valueOf());
    // if oneByOne mode we have to start new task right after previous one
    if (oneByOne) {
      const DELTA_ID = 2;
      const prevTask = tasks[id - DELTA_ID];
      if (typeof prevTask === 'object') {
        // We have to setup start as end of previout task with 1 millisecond delay,
        // cause we will check if any task is overlaying on another one
        start = prevTask.end + 1;
      }
    }
    const finish = new Date(start);
    const name = `Random task #${id}`;
    const end = getRandomInt(
      finish.setMinutes(finish.getMinutes() + MIN_DURATION).valueOf(),
      finish.setMinutes(finish.getMinutes() + MAX_DURATION).valueOf()
    );

    tasks.push({
      id,
      start,
      name,
      end,
    });
  }

  return tasks;
};

export default null;
