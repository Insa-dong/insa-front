import {combineReducers} from "redux";
import absReducer from "./AbsModule";
import adviceReducer from "./AdviceModule";
import evaReducer from "./EvaModule";
import memberReducer from "./LoginModule";
import studentReducer from "./StudentModule";
import studyInfoReducer from "./StudyInfoModule";
import studyReducer from "./StudyModule";
import studyStudentReducer from "./StudyStudentModule";
import trainingReducer from "./TrainingModule";
import empReducer from "./EmpModule";

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
  empReducer
})
export default rootReducer;