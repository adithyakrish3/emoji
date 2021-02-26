import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import RootReducer from "./reducers/RootReducer";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const configureStore = preloadedState => {
  // Store Creation
  const store = createStore(
    persistedReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  let persistor = persistStore(store);
  // persistor.purge();
  return { store, persistor };
}

export default configureStore;