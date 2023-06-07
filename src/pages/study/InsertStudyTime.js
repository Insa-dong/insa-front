import {useState} from "react";
import DateCSS from "./StudyTime.module.css";

function InsertStudyTime({form, day, setDay}) {

	const [dates, setDates] = useState(["월", "화", "수", "목", "금"]);

	const onChangeHandler = (e, index) => {
		if (day.length === 0) {
			const initialDay = dates.map(date => {
				let startTime = '';
				let endTime = '';
				return {
					startTime, endTime
				}
			});
			initialDay[index] = ({[e.target.name]: e.target.value});
			setDay(initialDay);
		} else {
			let temp = day.map(i => i);
			temp[index] = ({
				...temp[index],
				[e.target.name]: e.target.value
			})
			setDay(preDay => {
					preDay[index] = temp[index];
					return preDay;
				}
			)
			console.log('temp : ', temp);
		}
	}

	const mapArrayToDate = (dateArray) => {

		return dateArray.map((date, index) => {
			return (
				<div className = {DateCSS.calendarDateComponent} key = {"RCA-header-" + date}>
					{date}
					<input type = "time"
					       className = {DateCSS.calendarDateTime}
					       onChange = {(val) => onChangeHandler(val, index)}
					       name = "startTime"
					/>
					{<input type = "time" className = {DateCSS.calendarDateTime2}
					        onChange = {(val) => onChangeHandler(val, index)}
					        name = "endTime"
					/>}

				</div>
			);
		})

	}

	return (
		<div>
			{mapArrayToDate(dates)}
		</div>
	);
}

export default InsertStudyTime;