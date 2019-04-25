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
    case TYPES.START_TASK:
      return {
        ...state,
        current: {
          ...state.current,
          start: action.payload.start,
        },
      };
    case TYPES.RENAME_TASK:
      return {
        ...state,
        current: {
          ...state.current,
          name: action.payload.name,
        },
      };
    case TYPES.FINISH_TASK:
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
    default:
      return state;
  }
};
