import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import listCSS from '../lists/TrainingList.module.css'
import CSS from './TrainingItem.module.css'

function TrainingItem({item, checkValue, setCheckValue, index}) {

	const navigate = useNavigate();
	const [hover, setHover] = useState(false);
	const [targetValue, setTargetValue] = useState();
	const [display, setDisplay] = useState({display: 'none'});
	const ref = useRef([]);

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
		navigate(`/training/${targetValue}`);
	}

	const onCheckBoxClickHandler = () => {
		ref.current[index].checked = !ref.current[index].checked;
		ref.current.map(item => {
			if (item.checked) {
				setCheckValue((prev) => ([...prev, item.value]))
				setDisplay({display: 'block'})
			}
		})
	}

	const onChangeHandler = (e) => {
		e.target.checked = !e.target.checked;
	}

	return (
		<tr key = {item.trainingCode}
		    className = {hover ? listCSS.BodyTrStyle : listCSS.BodyTrStyle2}
		    onMouseOver = {onMouseOverHandler}
		    onMouseOut = {(e) => onMouseOutHandler(e)}
		    value = {item.trainingCode}
		>
			<th onClick = {onCheckBoxClickHandler}>
				<input type = "checkbox"
				       ref = {element => ref.current[index] = element}
				       className = {CSS.checkBox}
				       onClick = {onChangeHandler}
				       value = {item.trainingCode}
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
			>{item.studyCount}</th>
		</tr>
	)
}

export default TrainingItem;