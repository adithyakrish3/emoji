const defaultProperty = { default: true }

export default (state = defaultProperty, action) => {
  switch(action.type) {
    case "GET_EMOJI_SUCCESS":
      return action.payload
    case "GET_EMOJI_FAILURE":
      return { default: true }
    default:
      return state;
  }
};