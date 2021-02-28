export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("master_class", serializedState);
  } catch (e) {}
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("master_class");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
