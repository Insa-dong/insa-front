import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import listCSS from '../lists/TrainingList.module.css'
import CSS from './TrainingItem.module.css'

function TrainingItem({item, checkValue, setCheckValue}) {

	const navigate = useNavigate();
	const [hover, setHover] = useState(false);
	const [targetValue, setTargetValue] = useState();
	const [display, setDisplay] = useState({display: 'none'});
	const ref = useRef();

	const onMouseOverHandler = () => {
		setHover(true);
		setDisplay({display: 'block'});
		setTargetValue(item.trainingCode);
	}

	const onMouseOutHandler = () => {
		if (!ref.current.checked) {
			setDisplay({display: 'none'});
		}
		setHover(false);
	}

	const onClickHandler = () => {
		navigate(`/training/${targetValue}`);
	}

	const onCheckBoxClickHandler = () => {
		ref.current.checked = !ref.current.checked;
		setCheckValue(item.trainingCode);
		setDisplay({display: 'block'});
	}

	const onChangeHandler = (e) => {
		e.target.checked = !e.target.checked;
		setCheckValue(item.trainingCode)
	}

	return (
		<tr key = {item.trainingCode}
		    className = {hover ? listCSS.BodyTrStyle : listCSS.BodyTrStyle2}
		    onMouseOver = {onMouseOverHandler}
		    onMouseOut = {onMouseOutHandler}
		    value = {item.trainingCode}
		>
			<th onClick = {onCheckBoxClickHandler}>
				<input type = "checkbox"
				       ref = {ref}
				       className = {CSS.checkBox}
				       value = {item.trainingCode}
				       onChange = {onChangeHandler}
				       style = {display}
				/>
				{item.trainingCode}
			</th>
			<th
				onClick = {onClickHandler}
			>{item.trainingTitle}</th>
			<th
				onClick = {onClickHandler}
			>{item.trainingTime}</th>
			<th
				onClick = {onClickHandler}
			>{item.trainingQual}</th>
			<th
				onClick = {onClickHandler}
			>{item.trainingKnow}</th>
			<th
				onClick = {onClickHandler}
			>{item.trainingCount}</th>
		</tr>
	)
}

export default TrainingItem;