import { all, select, takeLatest, put } from 'redux-saga/effects';
import {
  ADD_TASK,
  REMOVE_TASK,
  START_TASK,
  FINISH_TASK,
  RESET_CURRENT_TASK,
} from '../actions/tasks';
import { saveState } from '../localStorage';

// Selectors
const getTasksStore = state => state.tasks;

// Workers
function* saveStateToLocalStorage() {
  const tasks = yield select(getTasksStore);
  saveState({ tasks });
}

function* addTask() {
  const { list, current } = yield select(getTasksStore);

  try {
    // check if any key has empty value
    Object.keys(current).forEach(key => {
      if (!current[key]) {
        throw Error(`Empty field ${key}`);
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
  } catch (e) {
    //TODO show Modal Error Message
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
