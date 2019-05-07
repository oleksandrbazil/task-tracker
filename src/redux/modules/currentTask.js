// Action Types
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
    type: FINISH_TASK,
    payload: {
      end,
    },
    options: {
      callback,
    },
  };
};
