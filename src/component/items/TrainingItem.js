import {useState} from "react";
import CSS from './TrainingItem.module.css'

function TrainingItem({item}) {

	const [code, setCode] = useState();

	const onChangeHandler = (e) => {
		console.log(e.target.value)
	}

	return (
		<tr key = {item.trainingCode}>
			<th>
				<input type = "checkbox"
				       className = {CSS.checkBox}
				       value = {item.trainingCode}
				       onChange = {onChangeHandler}/>
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