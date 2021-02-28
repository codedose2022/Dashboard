const events = (state = [], action) => {
  switch (action.type) {
    case "GET_EVENTS":
      return {
        ...state,
        events: action.payload,
      };
    case "ADD_EVENTS":
      return {
        ...state,
        events: [...action.payload],
      };

    default:
      return { ...state };
  }
};

export default events;
