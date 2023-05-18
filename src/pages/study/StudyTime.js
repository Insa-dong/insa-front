import {useState} from "react";
import DateCSS from './StudyTime.module.css';

function StudyTime({studyTimes, readOnly, form, setForm}) {

	const [dates, setDates] = useState(["월", "화", "수", "목", "금"]);

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const mapArrayToDate = (dateArray) => {

		return dateArray.map(date => {
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
						        name = "study.studyTimes.studyStartTime"
						/>}
						{<input type = "time" className = {DateCSS.calendarDateTime2}
						        onChange = {onChangeHandler}
						        defaultValue = {readOnly ? find.studyEndTime : form.study.studyTimes.studyEndTimes}
						        readOnly = {readOnly}
						        name = "study.studyTimes.studyEndTime"
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
					       name = {`${date}.startTime`}
					/>
					{<input type = "time" className = {DateCSS.calendarDateTime2}
					        onChange = {onChangeHandler}
					        readOnly = {readOnly}
					        name = {`${date}.endTime`}
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
