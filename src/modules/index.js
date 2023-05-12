import {combineReducers} from "redux";
import trainingReducer from "./TrainingModule";
import absReducer from "./AbsModule";

const rootReducer = combineReducers({
	trainingReducer, absReducer
});

export default rootReducer;