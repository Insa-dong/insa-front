import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {callSearchTrainingList, callTrainingList} from "../../apis/TrainingAPICalls";
import Header from "../../component/common/Header";
import PagingBar from "../../component/common/PagingBar";
import TrainingList from "../../component/lists/TrainingList";
import TrainingDeleteModal from "../../component/modal/TrainingDeleteModal";
import TrainingRegistModal from "../../component/modal/TrainingRegistModal";
import CSS from "./Training.module.css";

function Training() {

	const title = '과정';
	const subTitle = '과정 목록';
	const [search, setSearch] = useState();
	const [currentPage, setCurrentPage] = useState(1)
	const [checkValue, setCheckValue] = useState([]);
	const [insert, setInsert] = useState(false);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('value');
	const [isRegistModalOpen, setIsRegistModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const {remove} = useSelector(state => state.trainingReducer);
	const training = useSelector(state => state.trainingReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const ref = useRef();

	useEffect(
		() => {
			if (insert) {
				dispatch(callTrainingList({currentPage}));
				setInsert(false);
			}
		},
		[insert, dispatch, currentPage, remove]
	)

	useEffect(
		() => {
			if (searchValue) {
				dispatch(callSearchTrainingList({searchValue, currentPage}));
				setCheckValue([]);
			} else {
				dispatch(callTrainingList({currentPage}));
				ref.current.value = '';
				setCheckValue([]);
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
		setCheckValue([]);
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
						ref = {ref}
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
					              setCheckValue = {setCheckValue}
					              isDeleteModalOpen = {isDeleteModalOpen}/>
				}
				<button className = {CSS.ButtonStyle2} onClick = {() => setIsRegistModalOpen(true)}>등록하기</button>
				<button className = {CSS.ButtonStyle3} onClick = {() => {
					setIsDeleteModalOpen(true)
				}}>삭제하기
				</button>
				{training.pageInfo && <PagingBar pageInfo = {training.pageInfo} setCurrentPage = {setCurrentPage}/>}
			</div>
			{isRegistModalOpen && (
				<TrainingRegistModal isRegistOpen = {isRegistModalOpen} setIsRegistOpen = {setIsRegistModalOpen}
				                     setInsert = {setInsert}/>
			)}
			{isDeleteModalOpen && (
				<TrainingDeleteModal isDeleteModalOpen = {isDeleteModalOpen}
				                     setIsDeleteModalOpen = {setIsDeleteModalOpen}
				                     setInsert = {setInsert} checkValue = {checkValue} setCheckValue = {setCheckValue}/>
			)}
		</>
	)
}

export default Training;