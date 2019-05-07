import { all, select, takeLatest } from 'redux-saga/effects';
import {
  REMOVE_TASK,
  IMPORT_TASKS,
  tasksWatcher,
  selectTasks,
} from './modules/tasks';
import {
  START_TASK,
  UPDATE_TASK,
  CLEAR_TASK,
  selectCurrentTask,
  currentTaskWatcher,
} from './modules/currentTask';
import { saveState } from '../localStorage';

// Redux Saga Workers
function* saveStateToLocalStorage() {
  const tasks = yield select(selectTasks);
  const currentTask = yield select(selectCurrentTask);
  saveState({ tasks, currentTask });
}

// Redux Saga: Global Watcher
function* globalWatcher() {
  // We better user last actionType intead of real meaning to make sure we will have correct structure of State
  // ADD_TASK => CLEAR_TASK
  // REMOVE_ALL_TASKS => IMPORT_TASKS
  yield takeLatest(
    [START_TASK, UPDATE_TASK, CLEAR_TASK, REMOVE_TASK, IMPORT_TASKS],
    saveStateToLocalStorage
  );
}

export default function* rootSaga() {
  yield all([globalWatcher(), currentTaskWatcher(), tasksWatcher()]);
}
