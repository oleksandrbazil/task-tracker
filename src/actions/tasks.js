//action types
export const ADD_TASK = 'tasks/ADD_TASK';
export const REMOVE_TASK = 'tasks/REMOVE_TASK';
export const REMOVE_ALL_TASKS = 'tasks/REMOVE_ALL_TASKS';
export const UPDATE_CURRENT_TASK = 'tasks/UPDATE_CURRENT_TASK';
export const FINISH_CURRENT_TASK = 'tasks/FINISH_CURRENT_TASK';
export const RESET_CURRENT_TASK = 'tasks/RESET_CURRENT_TASK';

export const GENERATE_TASKS = 'tasks/GENERATE_TASKS';

export const updateCurrentTask = ({ name, start, end }) => {
  return {
    type: UPDATE_CURRENT_TASK,
    payload: {
      start,
      name,
      end,
    },
  };
};

export const finishTask = ({ callback }) => {
  const end = new Date().getTime();
  return {
    type: FINISH_CURRENT_TASK,
    payload: {
      end,
    },
    options: {
      callback,
    },
  };
};

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
