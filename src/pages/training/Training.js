import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callTrainingList} from "../../apis/TrainingAPICalls";
import Header from "../../component/common/Header";
import PagingBar from "../../component/common/PagingBar";
import TrainingList from "../../component/lists/TrainingList";
import CSS from "./Training.module.css";

function Training() {

	const title = '과정';
	const subTitle = '과정 목록';
	const [search, setSearch] = useState();
	const [currentPage, setCurrentPage] = useState(1)
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const training = useSelector(state => state.trainingReducer);

	useEffect(
		() => {
			dispatch(callTrainingList({currentPage}));
		},
		[]
	)

	const onChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onKeyDownHandler = (e) => {
		if (e.key === 'Enter') {
			onClickHandler();
		}
	}

	const onClickHandler = (e) => {
		navigate(`/search?value=${search}`);
	}

	const onClickDeleteHandler = () => {

	}

	return (
		<>
			<Header title = {title} subTitle = {subTitle}/>
			<div className = {CSS.HeaderDiv}>
				<div className = {CSS.centerDiv}>
					<select className = {CSS.SelectBox}>
						<option value = "trainingTitle">과정 이름</option>
						<option value = "trainingCount">회차</option>
					</select>
					<input
						className = {CSS.InputStyle}
						onChange = {onChangeHandler}
						onKeyDown = {onKeyDownHandler}
						type = "text"
						placeholder = "검색"
					>
					</input>
					<button className = {CSS.ButtonStyle} onClick = {onClickHandler}>
						<img src = "/images/돋보기.png" alt = "검색" className = {CSS.Image}/>
					</button>
				</div>
				{training && <TrainingList key = {training.trainingCode} training = {training}/>}
				<button className = {CSS.ButtonStyle2}>등록하기</button>
				<button className = {CSS.ButtonStyle3}>삭제하기</button>
				{training.pageInfo && <PagingBar pageInfo = {training.pageInfo} setCurrentPage = {setCurrentPage}/>}
			</div>
		</>
	)
}

export default Training;