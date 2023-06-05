import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {callSearchStudyList, callStudyInfoListAPI} from "../../apis/StudyInfoAPICalls";
import Header from "../../component/common/Header";
import PagingBar from "../../component/common/PagingBar";
import StudyList from "../../component/lists/StudyList";
import StudyDeleteModal from "../../component/modal/StudyDeleteModal";
import CSS from "../training/Training.module.css";

function Study() {

	const title = '강의'
	const subTitle = '강의 목록'
	const [selectedOption, setSelectedOption] = useState('studyTitle');
	const [search, setSearch] = useState();
	const [currentPage, setCurrentPage] = useState(1)
	const [checkValue, setCheckValue] = useState([]);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [insert, setInsert] = useState(false);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('value');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const study = useSelector(state => state.studyInfoReducer);
	const searchList = useSelector(state => state.studyInfoReducer);
	const {remove} = useSelector(state => state.studyInfoReducer);
	const ref = useRef();

	useEffect(
		() => {
			if (insert) {
				dispatch(callStudyInfoListAPI({currentPage}));
				setInsert(false);
			}
			if (remove?.status === 200) {
				setCurrentPage(1);
				setIsDeleteModalOpen(false);
				dispatch(callStudyInfoListAPI({currentPage}));
			}
		},
		[currentPage, dispatch, insert, remove]
	)

	useEffect(
		() => {
			if (searchValue) {
				dispatch(callSearchStudyList({searchValue, currentPage, selectedOption}));
				setCheckValue([]);
			} else {
				dispatch(callStudyInfoListAPI({currentPage}));
				ref.current.value = '';
				setCheckValue([]);
			}
		},
		[currentPage, dispatch, searchValue, selectedOption]
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
		navigate(`/studySearch?value=${search}`);
		setCheckValue([]);
	}

	const selectOnChangeHandler = (e) => {
		setSelectedOption(e.target.value);
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
						ref = {ref}
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
					           study = {searchList.length > 0 ? searchList : study}
					           checkValue = {checkValue} setCheckValue = {setCheckValue}
					           isDeleteModalOpen = {isDeleteModalOpen}
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
					                  setInsert = {setInsert} checkValue = {checkValue}
					                  setCheckValue = {setCheckValue}/>
				)}
				{searchList.length > 0 ? (searchList.pageInfo && <PagingBar pageInfo = {searchList.pageInfo}
				                                                            setCurrentPage = {setCurrentPage}/>) : (study.pageInfo &&
					<PagingBar pageInfo = {study.pageInfo} setCurrentPage = {setCurrentPage}/>)}
			</div>
		</>
	);
}

export default Study;