import { applyMiddleware, createStore, combineReducers } from "redux";

import ReduxThunk from "redux-thunk";
import ReduxLogger from "redux-logger";

import Reducer from "./reducers";

import { NetworkValidation } from "../middleware/networkValidator";

const middlewares = applyMiddleware(ReduxThunk, ReduxLogger, NetworkValidation);

const configureStore = () =>
  createStore(combineReducers({ ...Reducer }), {}, middlewares);

const store = configureStore();

export default store;
