import { put, take } from 'redux-saga/effects';
export const SHOW_DIALOG = 'confirmDialog/SHOW_DIALOG';
export const HIDE_DIALOG = 'confirmDialog/HIDE_DIALOG';
export const CONFIRM_DIALOG = 'confirmDialog/HIDE_CONFIRM_DIALOG';

const initialState = {
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return {
        isOpen: true,
      };
    case HIDE_DIALOG:
    case CONFIRM_DIALOG:
      return initialState;
    default:
      return state;
  }
};

export const hideDialog = () => ({
  type: HIDE_DIALOG,
});

export const confirmDialog = () => ({
  type: CONFIRM_DIALOG,
});

// Action Workers
export function* confirmDialogWorker() {
  yield put({
    type: SHOW_DIALOG,
  });

  yield take(CONFIRM_DIALOG);
}
