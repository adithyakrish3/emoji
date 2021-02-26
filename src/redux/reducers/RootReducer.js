import { combineReducers } from "redux";

import emojiReducer from './emoji';
import selectionReducer from './selection';
import userReactionReducer from './userReactions';
import usersReducer from './users';

const RootReducer = combineReducers({
	emoji: emojiReducer,
	selection: selectionReducer,
	reactions: userReactionReducer,
	users: usersReducer
})

export default RootReducer