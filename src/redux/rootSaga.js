import { all, select, takeLatest, takeEvery, put } from 'redux-saga/effects';
import {
  ADD_TASK,
  REMOVE_TASK,
  REMOVE_ALL_TASKS,
  GENERATE_TASKS,
  IMPORT_TASKS,
} from './modules/tasks';
import { OPEN_MODAL } from './modules/modal';
import {
  START_TASK,
  UPDATE_TASK,
  FINISH_TASK,
  CLEAR_TASK,
} from './modules/currentTask';
import { saveState } from '../localStorage';
import { generateRandom } from '../utilities/taskGenerator';

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
    const { options: { callback } = {} } = action;
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

function* generateTasks(action = {}) {
  yield put({
    type: REMOVE_ALL_TASKS,
    payload: {},
  });

  const { options: { oneByOne } = {} } = action;
  const tasks = generateRandom(oneByOne);

  yield put({
    type: IMPORT_TASKS,
    payload: {
      tasks,
    },
  });
}

// Watchers
function* actionWorker() {
  yield takeEvery(FINISH_TASK, addTask);
  yield takeEvery(GENERATE_TASKS, generateTasks);
  // We better user last actionType intead of real meaning to make sure we will have correct structure of State
  // ADD_TASK => CLEAR_TASK
  // REMOVE_ALL_TASKS => IMPORT_TASKS
  yield takeLatest(
    [START_TASK, UPDATE_TASK, CLEAR_TASK, REMOVE_TASK, IMPORT_TASKS],
    saveStateToLocalStorage
  );
}

export default function* rootSaga() {
  yield all([actionWorker()]);
}
