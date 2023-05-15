import {combineReducers} from "redux";
import absReducer from "./AbsModule";
import studentReducer from "./StudentModule";
import evaReducer from "./EvaModule";
import adviceReducer from "./AdviceModule";
import studyStudentReducer from "./StudyStudentModule";
import memberReducer from "./LoginModule";
import trainingReducer from "./TrainingModule";
const rootReducer = combineReducers({
	trainingReducer, absReducer, studentReducer, evaReducer , adviceReducer, studyStudentReducer, memberReducer
})
export default rootReducer;