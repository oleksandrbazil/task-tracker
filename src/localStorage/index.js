/**
 * Try to load state from localStorage
 * Do nothing if user disabled localStorage
 * @returns {*}
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

/**
 * Try to save Redux store into localStorage.
 * This function doesn't cover case when user disabled localStorage
 * @param state
 */
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // do something
  }
};
