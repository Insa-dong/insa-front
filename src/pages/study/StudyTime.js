import {useState} from "react";
import DateCSS from './StudyTime.module.css';

function StudyTime({studyTimes, readOnly}) {

	const [dates, setDates] = useState(["월", "화", "수", "목", "금"]);

	const mapArrayToDate = (dateArray) => {

		return dateArray.map(date => {
			const find = studyTimes.find(time => time.studyDate === date);
			console.log(find);
			if (find)
				return (
					<div className = {DateCSS.calendarDateComponent} key = {"RCA-header-" + date}>
						{date}
						{<input type = "text" className = {DateCSS.calendarDateTime} readOnly = {readOnly}
						        defaultValue = {`${find.studyStartTime} ~ ${find.studyEndTime}`}>
						</input>}
					</div>
				);
			return (
				<div className = {DateCSS.calendarDateComponent} key = {"RCA-header-" + date}>
					{date}
					<input type = "text" className = {DateCSS.calendarDateTime} readOnly = {readOnly}
					       defaultValue = ""></input>
				</div>
			);
		})

	}

	return (
		<div>
			{studyTimes && mapArrayToDate(dates)}
		</div>
	);
}

export default StudyTime;
