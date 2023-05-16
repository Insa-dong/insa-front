import {combineReducers} from "redux";
import absReducer from "./AbsModule";
import adviceReducer from "./AdviceModule";
import empReducer from "./EmpModule";
import evaReducer from "./EvaModule";
import memberReducer from "./LoginModule";
import studentReducer from "./StudentModule";
import studyInfoReducer from "./StudyInfoModule";
import studyReducer from "./StudyModule";
import studyStudentReducer from "./StudyStudentModule";
import studyTimeReducer from "./StudyTimeModule";
import trainingReducer from "./TrainingModule";

const rootReducer = combineReducers({
	trainingReducer,
	absReducer,
	studentReducer,
	evaReducer,
	adviceReducer,
	studyStudentReducer,
	memberReducer,
	studyReducer,
	studyInfoReducer,
	empReducer,
	studyTimeReducer
})
export default rootReducer;