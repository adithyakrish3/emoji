//import http from "../http";
//----------------------------------------------------------------
// LOAD EMOJI
//----------------------------------------------------------------
export function selectEmo(contentID, emo) {
  const ACTION_NAME = "SELECT";
  return function(dispatch) {
    dispatch({ type: `${ACTION_NAME}_SUCCESS`, payload: { emo, contentID } });
  };
}

export function unselectEmo(contentID, emo) {
  const ACTION_NAME = "UNSELECT";
  return function(dispatch) {
    dispatch({ type: `${ACTION_NAME}_SUCCESS`, payload: contentID });
  };
}
