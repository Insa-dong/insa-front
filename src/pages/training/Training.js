import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
	callResetTraining,
	callSearchTrainingList,
	callTrainingDeleteAPI,
	callTrainingList
} from "../../apis/TrainingAPICalls";
import Header from "../../component/common/Header";
import PagingBar from "../../component/common/PagingBar";
import TrainingList from "../../component/lists/TrainingList";
import CSS from "./Training.module.css";

function Training() {

	const title = '과정';
	const subTitle = '과정 목록';
	const [search, setSearch] = useState();
	const [currentPage, setCurrentPage] = useState(1)
	const [checkValue, setCheckValue] = useState("1");
	const [searchParams] = useSearchParams();
	const [insert, setInsert] = useState(false);
	const searchValue = searchParams.get('value');
	const training = useSelector(state => state.trainingReducer);
	const {modify} = useSelector(state => state.trainingReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log(training);

	useEffect(
		() => {
			if (modify?.status === 200) {
				alert('삭제가 완료되었습니다. 메인 페이지로 이동합니다.');
				navigate('/training', {replace: true});
				if (insert === false) {
					dispatch(callResetTraining());
				}
			}
		},
		[modify, navigate, insert, dispatch]
	)

	useEffect(
		() => {
			if (searchValue) {
				console.log('title : ', searchValue);
				dispatch(callSearchTrainingList({searchValue, currentPage}));
			} else {
				dispatch(callTrainingList({currentPage}));
			}
		},
		[currentPage, dispatch, searchValue]
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
					</select>
					<input
						className = {CSS.InputStyle}
						onChange = {onChangeHandler}
						onKeyDown = {onKeyDownHandler}
						type = "text"
						placeholder = "과정명을 입력하세요."
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