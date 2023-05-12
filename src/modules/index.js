import {combineReducers} from "redux";
import trainingReducer from "./TrainingModule";
import memberReducer from "./LoginModule";

const rootReducer = combineReducers({
	trainingReducer, memberReducer
});

export default rootReducer;