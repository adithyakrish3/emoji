import http from "../http";

//----------------------------------------------------------------
// LOAD EMOJI
//----------------------------------------------------------------
export function loadReactions() {
  const ACTION_NAME = "GET_EMOJI";
  return function(dispatch) {
    dispatch({ type: `${ACTION_NAME}_REQUEST` });
    return http
      .get(`/reactions`)
      .then(successResult => {
        const data = successResult.data;
        dispatch({ type: `${ACTION_NAME}_SUCCESS`, payload: data });
      })
      .catch(errorResult => {
        console.log(errorResult);
        dispatch({ type: `${ACTION_NAME}_FAILURE`, payload: errorResult });
      });
  };
}
