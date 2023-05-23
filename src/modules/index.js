import {combineReducers} from "redux";
import absReducer from "./AbsModule";
import adviceReducer from "./AdviceModule";
import boardReducer from "./BoardModule";
import calendarReducer from "./CalendarModule";
import empReducer from "./EmpModule";
import evaReducer from "./EvaModule";
import memberReducer from "./LoginModule";
import offReducer from "./OffModule";
import studentReducer from "./StudentModule";
import studyInfoReducer from "./StudyInfoModule";
import studyReducer from "./StudyModule";
import studyStudentReducer from "./StudyStudentModule";
import trainingReducer from "./TrainingModule";
import attendReducer from "./AttendModule";

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
	boardReducer,
	offReducer,
	calendarReducer,
	attendReducer
})
export default rootReducer;