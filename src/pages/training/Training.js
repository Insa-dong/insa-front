import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callTrainingDeleteAPI, callTrainingList} from "../../apis/TrainingAPICalls";
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
	const [checkValue, setCheckValue] = useState("1");
	const {modify} = useSelector(state => state.trainingReducer);

	useEffect(
		() => {
			if (modify?.status === 200) {
				console.log(modify)
				// 왜 과정 다시들어가면 알림이 다시뜸 ?
				alert('삭제가 완료되었습니다. 메인 페이지로 이동합니다.');
				navigate('/', {replace: true});
			}
		},
		[modify, navigate]
	)

	useEffect(
		() => {
			dispatch(callTrainingList({currentPage}));
		},
		[currentPage, dispatch]
	)

	const onChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onKeyDownHandler = (e) => {
		if (e.key === 'Enter') {
			onClickHandler();
		}
	}

	const onClickHandler = () => {
		navigate(`/search?value=${search}`);
	}

	const onClickDeleteHandler = () => {
		console.log(checkValue)
		if (window.confirm(`${checkValue}번 과정을 삭제하시겠습니까?`)) {
			dispatch(callTrainingDeleteAPI(checkValue));
		} else {
			alert('안하기')
		}
	}

	return (
		<>
			<Header title = {title} subTitle = {subTitle}/>
			<div className = {CSS.HeaderDiv}>
				<div className = {CSS.centerDiv}>
					<select className = {CSS.SelectBox}>
						<option value = "trainingTitle">과정명</option>
						<option value = "trainingCount">현재회차</option>
					</select>
					<input
						className = {CSS.InputStyle}
						onChange = {onChangeHandler}
						onKeyDown = {onKeyDownHandler}
						type = "text"
						placeholder = "검색어를 입력하세요."
					>
					</input>
					<button className = {CSS.ButtonStyle} onClick = {onClickHandler}>
						<img src = "/images/돋보기.png" alt = "검색" className = {CSS.Image}/>
					</button>
				</div>
				{training &&
					<TrainingList key = {training.trainingCode}
					              training = {training}
					              checkValue = {checkValue}
					              setCheckValue = {setCheckValue}/>
				}
				<button className = {CSS.ButtonStyle2} onClick = {() => navigate('/training/registration')}>등록하기
				</button>
				<button className = {CSS.ButtonStyle3} onClick = {onClickDeleteHandler}>삭제하기</button>
				{training.pageInfo && <PagingBar pageInfo = {training.pageInfo} setCurrentPage = {setCurrentPage}/>}
			</div>
		</>
	)
}

export default Training;