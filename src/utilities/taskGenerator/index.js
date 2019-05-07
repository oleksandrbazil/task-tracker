const MIN_TASKS = 10; // items
const MAX_TASKS = 15; // items
const MIN_DURATION = 10; // minutes
const MAX_DURATION = 90; // minutes

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generate = () => {
  let tasks = [];
  const now = new Date();
  const today = new Date(now.toLocaleDateString());
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
  const numberOfTasks = getRandomInt(MIN_TASKS, MAX_TASKS);

  for (let id = 1; id < numberOfTasks; id++) {
    const start = getRandomInt(today.valueOf(), tomorrow.valueOf());
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

export default generate;
