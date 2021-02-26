import http from "../http";
import _ from "lodash";

//----------------------------------------------------------------
// LOAD EMOJI
//----------------------------------------------------------------
export function loadUserReactions(contentID) {
  const ACTION_NAME = "LOAD_USER_REACTIONS";
  return function(dispatch) {
    dispatch({ type: `${ACTION_NAME}_REQUEST` });
    return http
      .get(`/user_content_reactions`)
      .then(successResult => {
        let data = _.filter(successResult.data, { content_id: contentID })
        
        dispatch({ type: `${ACTION_NAME}_SUCCESS`, payload: { contentID, data } });
      })
      .catch(errorResult => {
        console.log(errorResult);
        dispatch({ type: `${ACTION_NAME}_FAILURE`, payload: errorResult });
      });
  };
}
