import React, {useState} from "react";
import ModifyButton from "../calendar/ModifyButton";
import MyCalendar from "../calendar/MyCalendar";
import CSS from "./Main.module.css"

function Main() {

	const [isRegistOpen, setIsRegistOpen] = useState(false);
	const [buttonClick, setButtonClick] = useState(false);

	return (
		<>
			<div className = {CSS.mainContainer}>
				<div className = {CSS.Calendar}>
					<MyCalendar isRegistOpen = {isRegistOpen} setIsRegistOpen = {setIsRegistOpen}
					            buttonClick = {buttonClick}/>
					<ModifyButton setButtonClick = {setButtonClick}></ModifyButton>
				</div>
			</div>
		</>
	);
}

export default Main;