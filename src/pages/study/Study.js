import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {callStudyInfoListAPI} from "../../apis/StudyInfoAPICalls";
import Header from "../../component/common/Header";
import PagingBar from "../../component/common/PagingBar";
import StudyList from "../../component/lists/StudyList";
import StudyDeleteModal from "../../component/modal/StudyDeleteModal";
import CSS from "../training/Training.module.css";

function Study() {

	const title = '강의'
	const subTitle = '강의 목록'
	const [selectedOption, setSelectedOption] = useState('trainingTitle');
	const [search, setSearch] = useState();
	const [currentPage, setCurrentPage] = useState(1)
	const [checkValue, setCheckValue] = useState("1");
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [insert, setInsert] = useState(false);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('value');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const study = useSelector(state => state.studyInfoReducer);

	useEffect(
		() => {
			if (insert) {
				dispatch(callStudyInfoListAPI({currentPage}));
				setInsert(false);
			}
		},
		[currentPage, dispatch, insert]
	)

	useEffect(
		() => {
			if (selectedOption === 'trainingTitle' && searchValue) {

			} else if (selectedOption === 'studyTitle' && searchValue) {

			} else if (selectedOption === 'studyTeacher' && searchValue) {

			} else {
				dispatch(callStudyInfoListAPI({currentPage}));
			}
		},
		[currentPage, dispatch, searchValue, selectedOption]
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
		navigate(`/studySearch?value=${search}`);
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
						placeholder = {selectedOption === 'studyTitle' ? "강의명을 입력하세요." : selectedOption === 'studyTitle' ? "강의 명을 입력하세요." : selectedOption === 'studyTeacher' ? "강사 명을 입력하세요." : "검색어를 입력하세요."}
					>
					</input>
					<button className = {CSS.ButtonStyle} onClick = {onClickHandler}>
						<img src = "/images/돋보기.png" alt = "검색" className = {CSS.Image}/>
					</button>
				</div>
				{study &&
					<StudyList key = {study.studyInfoCode}
					           study = {study}
					           checkValue = {checkValue}
					           setCheckValue = {setCheckValue}
					           currentPage = {currentPage}
					/>
				}
				<button className = {CSS.ButtonStyle2} onClick = {() => navigate('/study/registration')}>등록하기
				</button>
				<button className = {CSS.ButtonStyle3} onClick = {() => {
					setIsDeleteModalOpen(true)
				}}>삭제하기
				</button>
				{isDeleteModalOpen && (
					<StudyDeleteModal isDeleteModalOpen = {isDeleteModalOpen}
					                  setIsDeleteModalOpen = {setIsDeleteModalOpen}
					                  setInsert = {setInsert} checkValue = {checkValue}/>
				)}
				{study.pageInfo && <PagingBar pageInfo = {study.pageInfo} setCurrentPage = {setCurrentPage}/>}
			</div>
		</>
	);
}

export default Study;