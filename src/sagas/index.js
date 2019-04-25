import { all, select, takeLatest, put } from 'redux-saga/effects';
import {
  ADD_TASK,
  REMOVE_TASK,
  START_TASK,
  FINISH_TASK,
  RESET_CURRENT_TASK,
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

function* addTask(action) {
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
    action.options.callback();
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

// Watchers
function* actionWorker() {
  yield takeLatest(FINISH_TASK, addTask);
  // We have to trigger by RESET_CURRENT_TASK instead of ADD_TASK,
  // cause it make possible saveState with empty currentTask
  yield takeLatest(
    [START_TASK, REMOVE_TASK, RESET_CURRENT_TASK],
    saveStateToLocalStorage
  );
}

export default function* rootSaga() {
  yield all([actionWorker()]);
}
