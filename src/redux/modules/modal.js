import { put } from 'redux-saga/effects';

// Action Types
export const OPEN_MODAL = 'modal/OPEN_MODAL';
export const CLOSE_MODAL = 'modal/CLOSE_MODAL';

const initialState = {
  isOpen: false,
  title: '',
  message: '',
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isOpen: true,
        title: action.payload.title,
        message: action.payload.message,
      };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};

// Action Creators
export const closeModal = () => ({
  type: CLOSE_MODAL,
  payload: {
    isOpen: false,
  },
});

// Redux Saga Workers
export function* showModal(title = 'Error', message = null) {
  yield put({
    type: OPEN_MODAL,
    payload: {
      title: title,
      message: message,
    },
  });
}
