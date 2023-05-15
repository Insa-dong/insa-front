import {combineReducers} from "redux";
import trainingReducer from "./TrainingModule";
import absReducer from "./AbsModule";
import memberReducer from './LoginModule';

const rootReducer = combineReducers({
	trainingReducer, absReducer, memberReducer
});

export default rootReducer;