import {useState} from "react";
import MyCalendar from "../calendar/MyCalendar";
import CSS from "./Main.module.css"

function Main() {

	const [isRegistOpen, setIsRegistOpen] = useState(false);

	return (
		<>
			<div className = {CSS.mainContainer}>
				<div className = {CSS.Calendar}>
					<MyCalendar isRegistOpen = {isRegistOpen} setIsRegistOpen = {setIsRegistOpen}/>
				</div>
			</div>
		</>
	);
}

export default Main;