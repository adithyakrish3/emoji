const defaultProperty = []

export default (state = defaultProperty, action) => {
  switch(action.type) {
    case "LOAD_USERS_SUCCESS":
      return action.payload
    case "LOAD_USERS_FAILURE":
    default:
      return state;
  }
};