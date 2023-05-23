import MyCalendar from "../calendar/MyCalendar";
import CSS from "./Main.module.css"

function Main() {
	return (
		<>
			<div className = {CSS.mainContainer}>
				<div className = {CSS.Calendar}>
					<MyCalendar/>
				</div>
			</div>
		</>
	);
}

export default Main;