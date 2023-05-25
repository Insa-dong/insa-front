import {combineReducers} from "redux";
import absReducer from "./AbsModule";
import adviceReducer from "./AdviceModule";
import attendReducer from "./AttendModule";
import boardReducer from "./BoardModule";
import buttonReducer from "./ButtonModule";
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
import mypageReducer from "./MpgModule";

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
	attendReducer,
	buttonReducer,
	mypageReducer
})
export default rootReducer;