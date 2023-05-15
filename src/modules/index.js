
import {combineReducers} from "redux";
import absReducer from "./AbsModule";
import studentReducer from "./StudentModule";
import evaReducer from "./EvaModule";
import adviceReducer from "./AdviceModule";
import studyStudentReducer from "./StudyStudentModule";
const rootReducer = combineReducers({
	trainingReducer, absReducer, studentReducer, evaReducer , adviceReducer, studyStudentReducer
});

export default rootReducer;