import { put, select, takeLatest } from 'redux-saga/effects';
import { showModal } from './modal';
import { TRY_ADD_TASK } from './tasks';

// Action Types
export const TRY_FINISH_TASK = 'currentTask/TRY_FINISH_TASK';
export const START_TASK = 'currentTask/START_TASK';
export const UPDATE_TASK = 'currentTask/UPDATE_TASK';
export const FINISH_TASK = 'currentTask/FINISH_TASK';
export const CLEAR_TASK = 'currentTask/CLEAR_TASK';

const initialState = {
  name: '',
  start: '',
  end: '',
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case START_TASK:
      return {
        ...state,
        start: action.payload.start,
      };
    case UPDATE_TASK:
      // try to get payload values
      const {
        start = state.start,
        name = state.name,
        end = state.end,
      } = action.payload;

      return {
        start,
        name,
        end,
      };
    case FINISH_TASK:
      return {
        ...state,
        end: action.payload.end,
      };
    case CLEAR_TASK:
      return initialState;
    default:
      return state;
  }
};

// Helper
function getDatetime() {
  return new Date().valueOf();
}

// Action Creators
export const startTask = () => {
  const start = getDatetime();
  return {
    type: START_TASK,
    payload: {
      start,
    },
  };
};

export const updateTask = ({ name, start, end }) => {
  return {
    type: UPDATE_TASK,
    payload: {
      start,
      name,
      end,
    },
  };
};

export const finishTask = ({ callback }) => {
  const end = getDatetime();
  return {
    type: TRY_FINISH_TASK,
    sagaData: {
      end,
      callback,
    },
  };
};

// Redux Selector
export const selectCurrentTask = state => state.currentTask;

// Redux Saga Workers
export function* tryFinishTask(action = {}) {
  try {
    const { sagaData: { end, callback } = {} } = action;
    let task = yield select(selectCurrentTask);
    task.end = end;

    // check if any key has empty value
    Object.keys(task).forEach(key => {
      const value = task[key];
      if (!value) {
        let message;
        switch (key) {
          case 'name':
            message = `You are trying to finish task without ${key}, enter the title and try again`;
            break;
          default:
            message = `You are trying to finish task without ${key}. `;
            break;
        }
        let e = new Error(message);
        e.title = `Empty task ${key}`;
        throw e;
      }
    });

    yield put({
      type: TRY_ADD_TASK,
      dataSaga: {
        task,
      },
    });

    // reset current task
    yield put({
      type: CLEAR_TASK,
    });

    // reset component state
    if (typeof callback === 'function') {
      callback();
    }
  } catch (e) {
    yield* showModal(e.title, e.message);
  }
}

// Redux Saga Watcher
export function* currentTaskWatcher() {
  yield takeLatest(TRY_FINISH_TASK, tryFinishTask);
}
