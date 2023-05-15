import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {callTrainingDeleteAPI} from "../../apis/TrainingAPICalls";
import Header from "../../component/common/Header";
import PagingBar from "../../component/common/PagingBar";
import TrainingList from "../../component/lists/TrainingList";
import CSS from "../training/Training.module.css";

function Study() {

	const title = '강의'
	const subTitle = '강의 목록'
	const [selectedOption, setSelectedOption] = useState('trainingTitle');
	const [search, setSearch] = useState();
	const [currentPage, setCurrentPage] = useState(1)
	const [checkValue, setCheckValue] = useState("1");
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('value');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(callStudyListAPI({currentPage}))
		}
	);

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
		if (window.confirm(`${checkValue}번 강의를 삭제하시겠습니까?`)) {
			dispatch(callTrainingDeleteAPI(checkValue));
		} else {
			alert('안하기')
		}
	}

	const selectOnChangeHandler = (e) => {
		setSelectedOption(e.target.value);
		console.log(selectedOption)
	}

	return (
		<>
			<Header title = {title} subTitle = {subTitle}/>
			<div className = {CSS.HeaderDiv}>
				<div className = {CSS.centerDiv}>
					<select className = {CSS.SelectBox} onChange = {selectOnChangeHandler}>
						<option value = "studyTitle">강의명</option>
						<option value = "studyTeacher">강사명</option>
						<option value = "trainingTitle">과정명</option>
					</select>
					<input
						className = {CSS.InputStyle}
						onChange = {onChangeHandler}
						onKeyDown = {onKeyDownHandler}
						type = "text"
						placeholder = {selectedOption === 'trainingTitle' ? "과정명을 입력하세요." : selectedOption === 'studyTitle' ? "강의 명을 입력하세요." : selectedOption === 'studyTeacher' ? "강사 명을 입력하세요." : "검색어를 입력하세요."}
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
	);
}

export default Study;