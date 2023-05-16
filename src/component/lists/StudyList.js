import StudyItem from "../items/StudyItem";
import CSS from "./TrainingList.module.css";

function StudyList({study, checkValue, setCheckValue}) {

	return (
		<table className = {CSS.tableStyle}>
			<thead>
			<tr className = {CSS.trStyle}>
				<th>강의 코드</th>
				<th>강의 명</th>
				<th>과정 명</th>
				<th>수업 기간</th>
				<th>정원</th>
				{/*<th>현재 인원</th>*/}
				<th>강사 명</th>
			</tr>
			</thead>
			<tbody className = {CSS.BodyTrStyle}>
			{study.data &&
				study.data.map((item, index) => (
					<StudyItem item = {item}
					           key = {item.studyInfoCode}
					           checkValue = {checkValue}
					           setCheckValue = {setCheckValue}
					/>
				))}
			</tbody>
		</table>
	);
}

export default StudyList;