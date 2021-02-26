import http from "../http";

//----------------------------------------------------------------
// LOAD EMOJI
//----------------------------------------------------------------
export function loadUsers() {
  const ACTION_NAME = "LOAD_USERS";
  return function(dispatch) {
    dispatch({ type: `${ACTION_NAME}_REQUEST` });
    return http
      .get(`/users`)
      .then(successResult => {
      	const data = successResult.data
        dispatch({ type: `${ACTION_NAME}_SUCCESS`, payload: data });
      })
      .catch(errorResult => {
        console.log(errorResult);
        dispatch({ type: `${ACTION_NAME}_FAILURE`, payload: errorResult });
      });
  };
}
