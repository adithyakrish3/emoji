const defaultProperty = { null: true }

export default (state = defaultProperty, action) => {
  switch(action.type) {
    case "SELECT_SUCCESS":
      if(state.null) {
      	return {
          [action.payload.contentID]: action.payload.emo
      	}
      }
      else {
      	return {
      	  ...state,
          [action.payload.contentID]: action.payload.emo
      	}
      }
    case "UNSELECT_SUCCESS":
      return {
        ...state,
        [action.payload]: { default: true }
      }
    default:
      return state;
  }
};