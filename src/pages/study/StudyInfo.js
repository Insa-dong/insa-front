import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../component/common/Header";
import CSS from "./StudyInfo.module.css";

function StudyInfo() {

	const title = '강의'
	const subTitle = '강의 조회';
	const dispatch = useDispatch();
	const {studyInfoCode} = useParams();
	const navigate = useNavigate();


	return (
		<>
			<Header title = {title} subTitle = {subTitle}/>
			<div className = {CSS.HeaderDiv}>
				<div className = {CSS.TopDiv}>
					<h2>강의 명</h2>
					<div className = {CSS.TopDivBox}>
						안녕
					</div>
					<h3>과정 명</h3>
					<div className = {CSS.TopDivBox}>
						안녕
					</div>
				</div>
			</div>
		</>
	);
}

export default StudyInfo;