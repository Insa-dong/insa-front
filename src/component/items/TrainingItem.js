import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import listCSS from '../lists/TrainingList.module.css'
import CSS from './TrainingItem.module.css'

function TrainingItem({item}) {

	const navigate = useNavigate();
	const [trainingCode, setTrainingCode] = useState();
	const [hover, setHover] = useState(false);
	const [display, setDisplay] = useState({display: 'none'});
	const ref = useRef();

	const onChangeHandler = (e) => {
		if (e.target.checked) {
			console.log(e.target.value);
			setTrainingCode(e.target.value);
		}
	}

	const onMouseOverHandler = (e) => {
		setHover(true);
		const value = e.target.parentNode.getAttribute('value');
		setTrainingCode(value);
		setDisplay({display: 'block'});
	}

	const onMouseOutHandler = () => {
		if (!ref.current.checked) {
			setDisplay({display: 'none'});
		}
		setHover(false);
	}

	const onClickHandler = () => {
		console.log(trainingCode)
		navigate(`/training/${trainingCode}`);
	}

	const onCheckBoxClickHandler = () => {
		ref.current.checked = !ref.current.checked;
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