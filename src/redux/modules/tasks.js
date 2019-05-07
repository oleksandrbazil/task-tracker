// Action Types
export const ADD_TASK = 'tasks/ADD_TASK';
export const REMOVE_TASK = 'tasks/REMOVE_TASK';
export const IMPORT_TASKS = 'tasks/IMPORT_TASKS';
export const REMOVE_ALL_TASKS = 'tasks/REMOVE_ALL_TASKS';
export const GENERATE_TASKS = 'tasks/GENERATE_TASKS';

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
  type: REMOVE_TASK,
  payload: {
    id,
  },
});

export const generateTasks = () => ({
  type: GENERATE_TASKS,
  payload: {},
});

// side effects, only as applicable
// Redux Saga Workers
