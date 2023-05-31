import TrainingItem from "../items/TrainingItem";
import CSS from './TrainingList.module.css';


function TrainingList({training, checkValue}) {

	return (
		<table className = {CSS.tableStyle}>
			<thead>
			<tr className = {CSS.trStyle}>
				<th>과정 코드</th>
				<th>과정 명</th>
				<th>훈련 시간</th>
				<th>필요 자격</th>
				<th>선수 지식</th>
				<th>현재 회차</th>
			</tr>
			</thead>
			<tbody className = {CSS.BodyTrStyle}>
			{training.data &&
				training.data.map((item, index) => (
					<TrainingItem item = {item}
					              key = {item.trainingCode}
					              checkValue = {checkValue}
					              index = {index}
					/>
				))}
			</tbody>
		</table>
	);
}

export default TrainingList;