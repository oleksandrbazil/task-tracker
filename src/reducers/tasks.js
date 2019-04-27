import * as TYPES from '../actions/tasks';

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
    case TYPES.UPDATE_CURRENT_TASK:
      // Maybe it's not the right way, but this will reduce a few actions
      // and make possible to simply generate new task
      const {
        start = state.current.start,
        name = state.current.name,
        end = state.current.end,
      } = action.payload;

      return {
        ...state,
        current: {
          start,
          name,
          end,
        },
      };
    case TYPES.FINISH_CURRENT_TASK:
      return {
        ...state,
        current: {
          ...state.current,
          end: action.payload.end,
        },
      };
    case TYPES.RESET_CURRENT_TASK:
      return {
        ...state,
        current: initialState.current,
      };
    case TYPES.ADD_TASK:
      return {
        ...state,
        list: state.list.concat([action.payload.task]),
      };
    case TYPES.REMOVE_TASK:
      return {
        ...state,
        list: state.list.filter(task => task.id !== action.payload.id),
      };

    case TYPES.REMOVE_ALL_TASKS:
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
};
