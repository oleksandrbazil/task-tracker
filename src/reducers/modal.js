import * as TYPES from '../actions/modal';

const initialState = {
  isOpen: false,
  title: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.OPEN_MODAL:
      return {
        isOpen: true,
        title: action.payload.title,
        message: action.payload.message,
      };
    case TYPES.CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};
