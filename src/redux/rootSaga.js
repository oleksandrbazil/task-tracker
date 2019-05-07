import { all, select, takeLatest, takeEvery, put } from 'redux-saga/effects';
import {
  ADD_TASK,
  REMOVE_TASK,
  REMOVE_ALL_TASKS,
  GENERATE_TASKS,
} from './modules/tasks';
import { OPEN_MODAL } from './modules/modal';
import {
  START_TASK,
  UPDATE_TASK,
  FINISH_TASK,
  CLEAR_TASK,
} from './modules/currentTask';
import { saveState } from '../localStorage';

// Selectors
const getTasksStore = state => {
  return state.tasks;
};
const getCurrentTaskStore = state => {
  return state.currentTask;
};

// Workers
function* saveStateToLocalStorage() {
  const tasks = yield select(getTasksStore);
  const currentTask = yield select(getCurrentTaskStore);
  saveState({ tasks, currentTask });
}

function* addTask(action = {}) {
  const tasks = yield select(getTasksStore);
  const task = yield select(getCurrentTaskStore);

  try {
    // check if any key has empty value
    Object.keys(task).forEach(key => {
      if (!task[key]) {
        let message;
        if (key) {
          message = `You are trying to finish task without ${key}, enter the title and try again`;
        } else {
          message = `You are trying to finish task without ${key}. `;
        }
        let e = new Error(message);
        e.title = `Empty task ${key}`;
        throw e;
      }
    });

    // define task id depend on the last item in array
    task.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    // Add currentTask to TaskList
    yield put({
      type: ADD_TASK,
      payload: {
        task,
      },
    });

    // reset current task
    yield put({
      type: CLEAR_TASK,
    });

    // reset component state
    const { action: { callback } = {} } = action;
    if (typeof callback === 'function') {
      callback();
    }
  } catch (e) {
    yield put({
      type: OPEN_MODAL,
      payload: {
        title: e.title || 'Error',
        message: e.message,
      },
    });
  }
}

function* generateTasks() {
  const MIN_TASKS = 10; // items
  const MAX_TASKS = 15; // items
  const MIN_DURATION = 10; // minutes
  const MAX_DURATION = 90; // minutes

  const now = new Date();
  const today = new Date(now.toLocaleDateString());
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  yield put({
    type: REMOVE_ALL_TASKS,
    payload: {},
  });

  const numberOfTasks = getRandomInt(MIN_TASKS, MAX_TASKS);

  for (let i = 1; i < numberOfTasks; i++) {
    const start = getRandomInt(today.valueOf(), tomorrow.valueOf());
    const finish = new Date(start);
    const name = `Random task #${i}`;
    const end = getRandomInt(
      finish.setMinutes(finish.getMinutes() + MIN_DURATION).valueOf(),
      finish.setMinutes(finish.getMinutes() + MAX_DURATION).valueOf()
    );

    yield put({
      type: UPDATE_TASK,
      payload: {
        start,
        name,
        end,
      },
    });

    yield* addTask();
  }
}

// Watchers
function* actionWorker() {
  yield takeEvery(FINISH_TASK, addTask);
  yield takeEvery(GENERATE_TASKS, generateTasks);
  // We have to trigger by CLEAR_TASK instead of ADD_TASK,
  // cause it make possible saveState with empty currentTask
  yield takeLatest(
    [START_TASK, UPDATE_TASK, CLEAR_TASK, REMOVE_TASK, REMOVE_ALL_TASKS],
    saveStateToLocalStorage
  );
}

export default function* rootSaga() {
  yield all([actionWorker()]);
}
