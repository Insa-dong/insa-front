import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import listCSS from "../lists/TrainingList.module.css";
import CSS from "./TrainingItem.module.css";

function StudyItem({item, checkValue, setCheckValue, data}) {

	const [hover, setHover] = useState(false);
	const [display, setDisplay] = useState({display: 'none'});
	const [targetValue, setTargetValue] = useState();
	const ref = useRef();
	const navigate = useNavigate();

	const onMouseOverHandler = (e) => {
		setHover(true);
		setDisplay({display: 'block'});
		setTargetValue(item.studyCode);
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
		setCheckValue(item.studyCode);
		setDisplay({display: 'block'});
	}

	const onChangeHandler = (e) => {
		e.target.checked = !e.target.checked;
		setCheckValue(item.studyCode)
	}

	return (
		<tr key = {item.studyCode}
		    className = {hover ? listCSS.BodyTrStyle : listCSS.BodyTrStyle2}
		    onMouseOver = {onMouseOverHandler}
		    onMouseOut = {onMouseOutHandler}
		    value = {item.studyCode}
		>
			<th onClick = {onCheckBoxClickHandler}>
				<input type = "checkbox"
				       ref = {ref}
				       className = {CSS.checkBox}
				       value = {item.studyCode}
				       onChange = {onChangeHandler}
				       style = {display}
				/>
				{`${item.training.trainingCode}-${item.training.trainingCount}-${item.studyCode}`}
			</th>
			<th onClick = {onClickHandler}>
				{data && data.studyContent}
			</th>
			<th onClick = {onClickHandler}>
				{item.training.trainingTitle}</th>
			<th onClick = {onClickHandler}>
				{`${item.studyStartDate} ~ ${item.studyEndDate}`}
			</th>
			<th onClick = {onClickHandler}>
				{item.studyMaxPeople}
			</th>
			<th onClick = {onClickHandler}>
				{data && data.teacher.empName}
			</th>
		</tr>
	)

}

export default StudyItem;