const defaultProperty = { null: true }

export default (state = defaultProperty, action) => {
  switch(action.type) {
    case "LOAD_USER_REACTIONS_SUCCESS":
      if(state.null) {
      	return {
          [action.payload.contentID]: action.payload.data
      	}
      }
      else {
      	return {
      	  ...state,
          [action.payload.contentID]: action.payload.data
      	}
      }
    case "LOAD_USER_REACTIONS_FAILURE":
    default:
      return state;
  }
};