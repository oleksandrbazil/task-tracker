import { all, select, takeLatest, takeEvery, put } from 'redux-saga/effects';
import {
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_CURRENT_TASK,
  FINISH_CURRENT_TASK,
  RESET_CURRENT_TASK,
  REMOVE_ALL_TASKS,
  GENERATE_TASKS,
} from '../actions/tasks';
import { OPEN_MODAL } from '../actions/modal';
import { saveState } from '../localStorage';

// Selectors
const getTasksStore = state => state.tasks;

// Workers
function* saveStateToLocalStorage() {
  const tasks = yield select(getTasksStore);
  saveState({ tasks });
}

function* addTask(action = {}) {
  const { list, current } = yield select(getTasksStore);

  try {
    // check if any key has empty value
    Object.keys(current).forEach(key => {
      if (!current[key]) {
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
    current.id = list.length > 0 ? list[list.length - 1].id + 1 : 1;

    // Add currentTask to TaskList
    yield put({
      type: ADD_TASK,
      payload: {
        task: current,
      },
    });

    // reset current task
    yield put({
      type: RESET_CURRENT_TASK,
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

  for (let i = 0; i <= numberOfTasks; i++) {
    const start = getRandomInt(today.getTime(), tomorrow.getTime());
    const finish = new Date(start);
    const name = `Random task #${i}`;
    const end = getRandomInt(
      finish.setMinutes(finish.getMinutes() + MIN_DURATION),
      finish.setMinutes(finish.getMinutes() + MAX_DURATION)
    );

    yield put({
      type: UPDATE_CURRENT_TASK,
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
  yield takeEvery(FINISH_CURRENT_TASK, addTask);
  yield takeEvery(GENERATE_TASKS, generateTasks);
  // We have to trigger by RESET_CURRENT_TASK instead of ADD_TASK,
  // cause it make possible saveState with empty currentTask
  yield takeLatest(
    [UPDATE_CURRENT_TASK, REMOVE_TASK, REMOVE_ALL_TASKS, RESET_CURRENT_TASK],
    saveStateToLocalStorage
  );
}

export default function* rootSaga() {
  yield all([actionWorker()]);
}
