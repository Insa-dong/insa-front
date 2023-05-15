import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callStudyInfoListAPI} from "../../apis/StudyInfoAPICalls";
import StudyItem from "../items/StudyItem";
import CSS from "./TrainingList.module.css";

function StudyList({study, checkValue, setCheckValue, currentPage}) {

	const dispatch = useDispatch();
	const studyInfo = useSelector(state => state.studyInfoReducer);


	useEffect(
		() => {
			dispatch(callStudyInfoListAPI({currentPage}));
		}, [currentPage, dispatch]
	)

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
					           key = {item.studyCode}
					           checkValue = {checkValue}
					           setCheckValue = {setCheckValue}
					           data = {studyInfo[index]}
					/>
				))}
			</tbody>
		</table>
	);
}

export default StudyList;