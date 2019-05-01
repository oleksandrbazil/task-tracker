import { buildData, HOURS_IN_DAY } from './buildData';

const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);

const task1 = {
  id: 1,
  name: 'Task 1',
  start: new Date('2019/01/01 10:00:00'),
  end: new Date('2019/01/01 10:40:00'),
};

// Task 2 is overlay on the Task 1 for a 10 minutes
const task2 = {
  id: 2,
  name: 'Task 2',
  start: new Date('2019/01/01 10:30:00'),
  end: new Date('2019/01/01 11:00:00'),
};

// Task 3 has time spent 03:20:00, should be in 4 timeSlots
const task3 = {
  id: 3,
  name: 'Task 3',
  start: new Date('2019/01/01 12:00:00'),
  end: new Date('2019/01/01 15:20:00'),
};

// Task 4 with different datetime start and finish
const task4 = {
  id: 4,
  name: 'Task 4',
  start: new Date('2019/01/01 22:40:00'),
  end: new Date('2019/01/02 00:30:00'),
};

const task5 = {
  id: 5,
  name: 'Task 5',
  start: new Date('2019/01/01 21:00:00'),
  end: new Date('2019/01/01 22:03:00'),
};

const task6 = {
  id: 6,
  name: 'Task 6',
  start: new Date('2019/01/01 22:05:00'),
  end: new Date('2019/01/01 22:35:00'),
};

const tasks = [task1, task2, task3, task4, task5, task6];

describe('buildData', () => {
  it('should returns array with 24 hour slots', () => {
    const data = buildData();
    expect(data.length).toBe(HOURS_IN_DAY);
  });

  it('should hide Overlay Tasks in DEFAULT MODE', () => {
    // We want to prevent showing tasks with overlay time spent in DEFAULT mode (OVERLAY=FALSE).
    // According to the testing data: Task 2 is overlay Task 1 for a 10 minutes
    // So we expect this task will be excluded from all timeSlots
    const data = buildData(tasks);
    const taskSlot1 = data.find(item => item.name === '10:00');

    expect(Number(taskSlot1[task2.id])).toBe(NaN);
  });

  it('should show Overlay Tasks in OVERLAY MODE', () => {
    // We would like to show tasks with overlay time spent in OVERLAY mode (OVERLAY=TRUE).
    // So we expect to see spent time of task 2 in timeSlots
    const data = buildData(tasks, true);
    const taskSlot1 = data.find(item => item.name === '10:00');
    const taskSlot2 = data.find(item => item.name === '11:00');

    expect(Number(taskSlot1[task2.id])).toBe(30);
    expect(Number(taskSlot2[task2.id])).toBe(60);
  });

  it('should show Spent Time in all time slots', () => {
    // Task 3 should be in 4 time slots 12:00, 13:00, 14:00, 15:00
    const taskId = task3.id;
    const data = buildData(tasks);
    const taskSlot1 = data.find(item => item.name === '12:00');
    const taskSlot2 = data.find(item => item.name === '13:00');
    const taskSlot3 = data.find(item => item.name === '14:00');
    const taskSlot4 = data.find(item => item.name === '15:00');

    expect(Number(taskSlot1[taskId])).toBe(60);
    expect(Number(taskSlot2[taskId])).toBe(60);
    expect(Number(taskSlot3[taskId])).toBe(60);
    expect(Number(taskSlot4[taskId])).toBe(20);
  });

  it('should show Spent Time across two days', () => {
    // Task 4 should be in 3 time slots 22:00, 23:00 and 00:00
    const taskId = task4.id;
    const data = buildData(tasks);
    const taskSlot1 = data.find(item => item.name === '22:00');
    const taskSlot2 = data.find(item => item.name === '23:00');
    const taskSlot3 = data.find(item => item.name === '00:00');

    expect(Number(taskSlot1[taskId])).toBe(20);
    expect(Number(taskSlot2[taskId])).toBe(60);
    expect(Number(taskSlot3[taskId])).toBe(30);
  });
  it('should show Sent Time independently of task sorting', () => {
    const data = buildData(tasks);
    const taskSlot1 = data.find(item => item.name === '22:00');

    expect(Number(taskSlot1[task6.id])).toBe(30);
  });
});
