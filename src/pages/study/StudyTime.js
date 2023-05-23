import {useState} from "react";
import DateCSS from './StudyTime.module.css';

function StudyTime({studyTimes, readOnly, form, day, setDay}) {

	const [dates, setDates] = useState(["월", "화", "수", "목", "금"]);
	console.log('studyTimes  :  ', studyTimes);
	console.log('form : ', form);

	const onChangeHandler = (e, index) => {
		if (day.length === 0) {
			const initialDay = dates.map(date => {
				const find = studyTimes.find(time => time.studyDate === date);
				let startTime = '';
				let endTime = '';
				if (find) {
					startTime = find.studyStartTime;
					endTime = find.studyEndTime;
				}
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
			const find = studyTimes.find(time => time.studyDate === date);
			if (find)
				return (
					<div className = {DateCSS.calendarDateComponent} key = {"RCA-header-" + date}>
						{date}
						{<input type = "time"
						        className = {DateCSS.calendarDateTime}
						        defaultValue = {readOnly ? find.studyStartTime : form.study.studyTimes.studyStartTime}
						        readOnly = {readOnly}
						        onChange = {(val) => onChangeHandler(val, index)}
						        name = "startTime"
						/>}
						{<input type = "time" className = {DateCSS.calendarDateTime2}
						        onChange = {(val) => onChangeHandler(val, index)}
						        defaultValue = {readOnly ? find.studyEndTime : form.study.studyTimes.studyEndTime}
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
