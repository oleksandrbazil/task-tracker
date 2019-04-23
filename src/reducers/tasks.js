import { ADD_TASK, REMOVE_TASK, SET_CURRENT_TASK } from '../actions/tasks';

const initialState = {
  current: {
    name: '',
    start: '',
    end: '',
  },
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      // Actually I have no idea where is the best place to setup id for task.
      // In my opinion this place is enough as temporary decision for test project.
      // If you know how to make it better, please let me know
      // We have to cover case when user removed some of tasks,
      // in this case we will take id based on the last item
      let id =
        state.list.length > 0 ? state.list[state.list.length - 1].id + 1 : 1;
      action.payload.task.id = id;

      return {
        ...state,
        list: state.list.concat([action.payload.task]),
      };
    case REMOVE_TASK:
      return {
        ...state,
        list: state.list.filter(task => task.id !== action.payload.id),
      };
    case SET_CURRENT_TASK:
      return {
        ...state,
        current: action.payload.current,
      };
    default:
      return state;
  }
};
