import {useState} from "react";
import DateCSS from './StudyTime.module.css';

function StudyTime({studyTimes, readOnly, form, setForm}) {

	const [dates, setDates] = useState(["월", "화", "수", "목", "금"]);
	const [day, setDay] = useState([]);

	const onChangeHandler = (e) => {
		day.push({
			[e.target.name]: e.target.value
		});
		setForm({
			...form,
			day
		});
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
						        defaultValue = {readOnly ? find.studyStartTime : form.study.studyTimes.studyStartTimes}
						        readOnly = {readOnly}
						        onChange = {onChangeHandler}
						        name = {`${index}.startTime`}
						/>}
						{<input type = "time" className = {DateCSS.calendarDateTime2}
						        onChange = {onChangeHandler}
						        defaultValue = {readOnly ? find.studyEndTime : form.study.studyTimes.studyEndTimes}
						        readOnly = {readOnly}
						        name = {`${index}.endTime`}
						/>}
					</div>
				);
			return (
				<div className = {DateCSS.calendarDateComponent} key = {"RCA-header-" + date}>
					{date}
					<input type = "time"
					       className = {DateCSS.calendarDateTime}
					       readOnly = {readOnly}
					       onChange = {onChangeHandler}
					       name = {`${index}.startTime`}
					/>
					{<input type = "time" className = {DateCSS.calendarDateTime2}
					        onChange = {onChangeHandler}
					        readOnly = {readOnly}
					        name = {`${index}.endTime`}
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
