//action types
export const ADD_TASK = 'tasks/ADD_TASK';
export const REMOVE_TASK = 'tasks/REMOVE_TASK';
export const SET_CURRENT_TASK = 'tasks/SET_CURRENT_TASK';

export const addTask = ({ name, start, end }) => {
  return {
    type: ADD_TASK,
    payload: {
      task: {
        name,
        start,
        end,
      },
    },
  };
};

export const removeTask = ({ id }) => ({
  type: REMOVE_TASK,
  payload: {
    id,
  },
});

export const setCurrentTask = ({ name, start, end }) => ({
  type: SET_CURRENT_TASK,
  payload: {
    current: {
      name,
      start,
      end,
    },
  },
});
