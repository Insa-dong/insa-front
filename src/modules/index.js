import {combineReducers} from "redux";
import absReducer from "./AbsModule";
import adviceReducer from "./AdviceModule";
import evaReducer from "./EvaModule";
import memberReducer from "./LoginModule";
import studentReducer from "./StudentModule";
import studyReducer from "./StudyModule";
import studyStudentReducer from "./StudyStudentModule";
import trainingReducer from "./TrainingModule";

const rootReducer = combineReducers({
	trainingReducer,
	absReducer,
	studentReducer,
	evaReducer,
	adviceReducer,
	studyStudentReducer,
	memberReducer,
	studyReducer
})

export default rootReducer;