import {applyMiddleware, legacy_createStore as createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from "./modules";

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(ReduxThunk, ReduxLogger))
);

export default store;