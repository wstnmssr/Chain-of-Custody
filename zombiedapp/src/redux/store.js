import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import reducer from "./modules/czAppDuck";

const loggerMiddleware = createLogger(); // initialize logger


const store = createStore(reducer, applyMiddleware(thunkMiddleware,loggerMiddleware));
export default store;
