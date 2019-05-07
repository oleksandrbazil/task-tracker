import { takeLatest, select, put, call } from 'redux-saga/effects';
import { showModal } from './modal';
import { confirmDialogWorker } from './confirmDialog';
import { generateRandom } from '../../utilities/taskGenerator';

// Action Types
export const TRY_ADD_TASK = 'tasks/TRY_ADD_TASK';
export const TRY_REMOVE_TASK = 'tasks/TRY_REMOVE_TASK';
export const TRY_GENERATE_TASKS = 'tasks/TRY_GENERATE_TASKS';
export const ADD_TASK = 'tasks/ADD_TASK';
export const REMOVE_TASK = 'tasks/REMOVE_TASK';
export const IMPORT_TASKS = 'tasks/IMPORT_TASKS';
export const REMOVE_ALL_TASKS = 'tasks/REMOVE_ALL_TASKS';

const initialState = [];

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return state.concat([action.payload.task]);
    case REMOVE_TASK:
      return state.filter(task => task.id !== action.payload.id);
    case IMPORT_TASKS:
      return action.payload.tasks;
    case REMOVE_ALL_TASKS:
      return initialState;
    default:
      return state;
  }
};

// Action Creators
export const removeTask = ({ id }) => ({
  type: TRY_REMOVE_TASK,
  sagaData: { id },
});

export const generateTasks = (oneByOne = false) => ({
  type: TRY_GENERATE_TASKS,
  sagaData: { oneByOne },
});

// Redux Selectors
export const selectTasks = state => state.tasks;

// Redux Saga Workers
function* tryAddTask(action = {}) {
  try {
    const tasks = yield select(selectTasks);
    const {
      dataSaga: { task },
    } = action;

    // define task id depend on the last item in array
    task.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    // Add currentTask to TaskList
    yield put({
      type: ADD_TASK,
      payload: {
        task,
      },
    });
  } catch (e) {
    yield* showModal(e.title, e.message);
  }
}

export function* tryRemoveTask(action = {}) {
  try {
    const { sagaData: { id } = {} } = action;

    yield* confirmDialogWorker();

    yield put({
      type: REMOVE_TASK,
      payload: {
        id,
      },
    });
  } catch (e) {
    yield* showModal(e.title, e.message);
  }
}

function* tryGenerateTasks(action = {}) {
  try {
    const { sagaData: { oneByOne } = {} } = action;
    const tasks = yield call(generateRandom, oneByOne);

    yield put({
      type: REMOVE_ALL_TASKS,
      payload: {},
    });

    yield put({
      type: IMPORT_TASKS,
      payload: {
        tasks,
      },
    });
  } catch (e) {
    yield* showModal(e.title, e.message);
  }
}

// Redux Saga Watcher
export function* tasksWatcher() {
  yield takeLatest(TRY_ADD_TASK, tryAddTask);
  yield takeLatest(TRY_REMOVE_TASK, tryRemoveTask);
  yield takeLatest(TRY_GENERATE_TASKS, tryGenerateTasks);
}
