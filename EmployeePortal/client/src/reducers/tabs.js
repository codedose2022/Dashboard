export default (state = [], action) => {
  switch (action.type) {
    case "TABS_CHANGE":
      return {
        selectedTab:action.payload,
      };

    default:
      return state ;
  }
};
