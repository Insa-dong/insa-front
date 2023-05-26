import React, {useState} from "react";
import Header from "../../component/common/Header";
import CSS from "./Calendar.module.css"
import ModifyButton from "./ModifyButton";
import MyCalendar from "./MyCalendar";

function Calendar() {

	const [isRegistOpen, setIsRegistOpen] = useState(false);
	const title = '일정';


	return (
		<>
			<Header title = {title}/>
			<div className = {CSS.mainContainer}>
				<div>
					<MyCalendar/>
					<ModifyButton isRegistOpen = {isRegistOpen}
					              setIsRegistOpen = {setIsRegistOpen}></ModifyButton>
				</div>
			</div>
		</>
	);
}

export default Calendar;