import {useState} from "react";
import listCSS from '../lists/TrainingList.module.css'
import CSS from './TrainingItem.module.css'

function TrainingItem({item}) {

	const [code, setCode] = useState();
	const [hover, setHover] = useState(false);

	const onChangeHandler = (e) => {
		if (e.target.checked) {
			console.log(e.target.value);
			setCode(e.target.value);
		}
	}

	const onMouseOverHandler = () => {
		setHover(true);
	}

	const onMouseOutHandler = () => {
		setHover(false);
	}

	return (
		<tr key = {item.trainingCode}
		    className = {hover ? listCSS.BodyTrStyle : listCSS.BodyTrStyle2}
		    onMouseOver = {onMouseOverHandler}
		    onMouseOut = {onMouseOutHandler}>
			<th>
				<input type = "checkbox"
				       className = {CSS.checkBox}
				       value = {item.trainingCode}
				       onChange = {onChangeHandler}
				/>
				{item.trainingCode}
			</th>
			<th>{item.trainingTitle}</th>
			<th>{item.trainingTime}</th>
			<th>{item.trainingQual}</th>
			<th>{item.trainingKnow}</th>
			<th>{item.trainingCount}</th>
		</tr>
	)
}

export default TrainingItem;