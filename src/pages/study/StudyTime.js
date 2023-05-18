import {useState} from "react";
import DateCSS from './StudyTime.module.css';

function StudyTime({studyTimes, readOnly, form, setForm, studyDate, setStudyDate}) {

	const [dates, setDates] = useState(["월", "화", "수", "목", "금"]);
	const [day, setDay] = useState([]);
	const makeInitialDay = () => {
		const initialDay = dates.map(date => {
			const find = studyTimes.find(time => time.studyDate === date);
			let startTime = '';
			let endTime = '';
			if (find) {
				startTime = find.startTime;
				endTime = find.endTime;
			}
			return {
				startTime, endTime
			}
		});

		setDay(initialDay);
	}
	const onChangeHandler = (e, index) => {
		console.log(e);
		console.log(index);
		if (day.length === 0) makeInitialDay();
		let temp = day.map(i => i);
		temp[index] = ({
			...temp[index],
			[e.target.name]: e.target.value
		})
		setDay(temp);
		setForm({
			...form,
			day
		})
	}

	console.log('day', day);
	const mapArrayToDate = (dateArray) => {

		return dateArray.map((date, index) => {
			const find = studyTimes.find(time => time.studyDate === date);
			if (find)
				return (
					<div className = {DateCSS.calendarDateComponent} key = {"RCA-header-" + date}>
						{date}
						{<input type = "time"
						        className = {DateCSS.calendarDateTime}
						        defaultValue = {readOnly ? find.studyStartTime : form.study.studyTimes.studyStartTimes}
						        readOnly = {readOnly}
						        onChange = {(val) => onChangeHandler(val, index)}
						        name = "startTime"
						/>}
						{<input type = "time" className = {DateCSS.calendarDateTime2}
						        onChange = {(val) => onChangeHandler(val, index)}
						        defaultValue = {readOnly ? find.studyEndTime : form.study.studyTimes.studyEndTimes}
						        readOnly = {readOnly}
						        name = "endTime"
						/>}
					</div>
				);
			return (
				<div className = {DateCSS.calendarDateComponent} key = {"RCA-header-" + date}>
					{date}
					<input type = "time"
					       className = {DateCSS.calendarDateTime}
					       readOnly = {readOnly}
					       onChange = {(val) => onChangeHandler(val, index)}
					       name = "startTime"
					/>
					{<input type = "time" className = {DateCSS.calendarDateTime2}
					        onChange = {(val) => onChangeHandler(val, index)}
					        readOnly = {readOnly}
					        name = "endTime"
					/>}

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
