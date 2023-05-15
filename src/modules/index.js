import {combineReducers} from "redux";
import absReducer from "./AbsModule";
import memberReducer from "./LoginModule";
import trainingReducer from "./TrainingModule";

const rootReducer = combineReducers({
	trainingReducer, absReducer, memberReducer
});

export default rootReducer;