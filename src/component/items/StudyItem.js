import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import listCSS from "../lists/TrainingList.module.css";
import CSS from "./TrainingItem.module.css";

function StudyItem({item, checkValue, setCheckValue}) {

	const [hover, setHover] = useState(false);
	const [display, setDisplay] = useState({display: 'none'});
	const [targetValue, setTargetValue] = useState();
	const ref = useRef();
	const navigate = useNavigate();

	const onMouseOverHandler = () => {
		setHover(true);
		setDisplay({display: 'block'});
		setTargetValue(item.studyInfoCode);
	}

	const onMouseOutHandler = () => {
		if (!ref.current.checked) {
			setDisplay({display: 'none'});
		}
		setHover(false);
	}

	const onClickHandler = () => {
		navigate(`/studyInfo/${targetValue}`);
	}

	const onCheckBoxClickHandler = () => {
		ref.current.checked = !ref.current.checked;
		setCheckValue(item.studyInfoCode);
		setDisplay({display: 'block'});
	}

	const onChangeHandler = (e) => {
		e.target.checked = !e.target.checked;
		setCheckValue(item.studyInfoCode)
	}

	return (
		<tr key = {item.studyInfoCode}
		    className = {hover ? listCSS.BodyTrStyle : listCSS.BodyTrStyle2}
		    onMouseOver = {onMouseOverHandler}
		    onMouseOut = {onMouseOutHandler}
		    value = {item.studyInfoCode}
		>
			<th onClick = {onCheckBoxClickHandler}>
				<input type = "checkbox"
				       ref = {ref}
				       className = {CSS.checkBox}
				       value = {item.studyInfoCode}
				       onChange = {onChangeHandler}
				       style = {display}
				/>
				{`${item.study.training.trainingCode}-${item.study.training.trainingCount}-${item.studyInfoCode}`}
			</th>
			<th onClick = {onClickHandler}>
				{item && item.studyTitle}
			</th>
			<th onClick = {onClickHandler}>
				{item.study.training.trainingTitle}</th>
			<th onClick = {onClickHandler}>
				{`${item.studyInfoStartDate} ~ ${item.studyInfoEndDate}`}
			</th>
			<th onClick = {onClickHandler}>
				{item.study.studyMaxPeople}
			</th>
			<th onClick = {onClickHandler}>
				{item && item.teacher.empName}
			</th>
		</tr>
	)

}

export default StudyItem;