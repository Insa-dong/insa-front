import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import listCSS from "../lists/TrainingList.module.css";
import CSS from "./TrainingItem.module.css";

function StudyItem({item, checkValue, setCheckValue, index}) {

	const [hover, setHover] = useState(false);
	const [display, setDisplay] = useState({display: 'none'});
	const [targetValue, setTargetValue] = useState();
	const [isChecked, setIsChecked] = useState(false);
	const ref = useRef([]);
	const navigate = useNavigate();

	const onMouseOverHandler = () => {
		setHover(true);
		setDisplay({display: 'block'});
		setTargetValue(item.trainingCode);
	}

	const onMouseOutHandler = (e) => {
		if (!ref.current[index].checked) {
			setDisplay({display: 'none'});
		}
		setHover(false);
	}

	const onClickHandler = () => {
		navigate(`/studyInfo/${targetValue}`);
	}

	const onCheckBoxClickHandler = () => {
		ref.current[index].checked = !ref.current[index].checked;
		setIsChecked(true)
		ref.current.map(item => {
			if (item.checked) {
				setCheckValue((prev) => ([...prev, item.value]))
				setDisplay({display: 'block'})
			} else {
				setDisplay({display: 'none'})
				console.log(checkValue)
				const filter = checkValue.filter(check => {
					setIsChecked(false);
					return check !== item.value;
				});
				setCheckValue(filter);
			}
		})
	}

	const onCheckClickHandler = (e) => {
		e.target.checked = !e.target.checked;
	}

	const onChangeHandler = (e) => {
		e.target.checked = isChecked;
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
				       ref = {element => ref.current[index] = element}
				       className = {CSS.checkBox}
				       onClick = {onCheckClickHandler}
				       onChange = {onChangeHandler}
				       value = {item.studyInfoCode}
				       style = {display}
				       checked = {isChecked}
				/>
				{`${item.study.training.trainingCode}-${item.study.studyCount}-${item.studyInfoCode}`}
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