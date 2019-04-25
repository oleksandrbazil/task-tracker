//action types
export const ADD_TASK = 'tasks/ADD_TASK';
export const REMOVE_TASK = 'tasks/REMOVE_TASK';
export const START_TASK = 'tasks/START_TASK';
export const RENAME_TASK = 'tasks/RENAME_TASK';
export const FINISH_TASK = 'tasks/FINISH_TASK';
export const RESET_CURRENT_TASK = 'tasks/RESET_CURRENT_TASK';

export const startTask = () => {
  const start = new Date().getTime();
  return {
    type: START_TASK,
    payload: {
      start,
    },
  };
};

export const renameTask = ({ name }) => ({
  type: RENAME_TASK,
  payload: {
    name,
  },
});

export const finishTask = ({ callback }) => {
  const end = new Date().getTime();
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

export const removeTask = ({ id }) => ({
  type: REMOVE_TASK,
  payload: {
    id,
  },
});
