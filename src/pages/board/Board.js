import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callBoardListAPI, callBoardSearchAPI} from "../../apis/BoardAPICall";
import Header from "../../component/common/Header";
import PagingBar from "../../component/common/PagingBar";
import BoardDetailModal from "../../component/modal/BoardDetailModal";
import BoardRegistModal from "../../component/modal/BoardRegistModal";
import CSS from "./Board.module.css";

function formatDate(dateString) {
	const date = new Date(dateString);
	const options = {year: "numeric", month: "2-digit", day: "2-digit", weekday: "short"};
	return new Intl.DateTimeFormat("ko-KR", options).format(date).replace(/\.$/, "");

}

function Board() {

	const title = '공지사항';
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const board = useSelector(state => state.boardReducer);
	const {data} = useSelector(state => state.boardReducer);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchOption, setSearchOption] = useState('title');
	const [searchKeyword, setSearchKeyword] = useState('');

	const onClickBoardDetail = (noticeCode) => {
		navigate(`/board/${noticeCode}`);
	}

	/* 공지사항 모달창 */
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const openModal = (item) => {
		setSelectedItem(item);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	/* 공지 등록하기 모달창 */
	const [isRegistModalOpen, setIsRegistModalOpen] = useState(false);

	const openRegistModal = () => {
		setIsRegistModalOpen(true);
	};

	const closeRegistModal = () => {
		setIsRegistModalOpen(false);
	};


	/* 검색 옵션 상태 저장 */
	const onSearchOptionChangeHandler = (e) => {
		setSearchOption(e.target.value);
	}

	/* 검색어 입력값 상태 저장*/
	const onSearchChangeHandler = (e) => {
		setSearchKeyword(e.target.value);
	}

	/* 검색버튼 누르면 검색화면으로 넘어가는 이벤트 */
	const onClickSearchHandler = (e) => {
		dispatch(callBoardSearchAPI({searchOption, searchKeyword, currentPage}));
	}

	useEffect(
		() => {
			dispatch(callBoardListAPI({currentPage}));
		},
		[currentPage]
	);


	return (
		<>
			<Header title = {title}/>
			<div className = {CSS.boardWrapper}>
				<div className = "StuSearchBox">
					<select
						id = "StuSelect"
						onChange = {onSearchOptionChangeHandler}
					>
						<option value = "title">제목</option>
						<option value = "content">내용</option>
						<option value = "writer">작성자</option>
					</select>

					<input
						type = "text"
						id = "search"
						placeholder = " 검색어를 입력하세요"
						onChange = {onSearchChangeHandler}
					/>
					<button className = "StuSearchBtn">
						<img
							src = "/images/search.png"
							alt = "검색"
							onClick = {onClickSearchHandler}/>
					</button>
				</div>
				<div className = {CSS.topline}></div>

				{data && data.map(p => (
					<div
						key = {p.noticeCode}
						className = {CSS.mainContent}
						onClick = {() => onClickBoardDetail(p.noticeCode)}
					>
						<ul style = {{display: 'flex', paddingLeft: '2vw'}}>
							<li id = {CSS.deptCode}
							    className = {`${CSS[`deptCode-${p.noticeWriter.dept.deptCode}`]}`}>{p.noticeWriter.empName.slice(-2)}</li>
							<li>
								<ul>
									<ul style = {{display: 'flex'}}>
										<li>
											<ul style = {{display: 'flex'}}>
												<li><img src = "/images/공지사항제목.png" className = {CSS.boardImg}
												         alt = "공지사항제목이미지"/></li>
												<li className = {CSS.title}>{p.noticeTitle}</li>
											</ul>
										</li>
										<li className = {CSS.date}>{formatDate(p.noticeWriteDate)}</li>
									</ul>
									<ul style = {{display: 'flex'}}>
										<li className = {CSS.writer}>{p.noticeWriter.empName}</li>
										<li><img src = "/images/화살표.png" className = {CSS.allowImg} alt = "화살표이미지"/>
										</li>
										<li className = {CSS.dept}>{p.noticeWriter.dept.deptName}팀·</li>
										<li className = {CSS.job}>{p.noticeWriter.job.jobName}</li>
									</ul>
									<li className = {CSS.content}>{p.noticeContent}</li>
								</ul>
							</li>
						</ul>
					</div>))
				}
				<div className = {CSS.paging}>
					{board.pageInfo && <PagingBar pageInfo = {board.pageInfo} setCurrentPage = {setCurrentPage}/>}
				</div>
				<button
					className = {CSS.boardBtn}
					type = "button"
					onClick = {() => openRegistModal()}
				>
					+ 공지 등록하기
				</button>
				<BoardDetailModal isOpen = {isModalOpen} onClose = {closeModal} selectedItem = {selectedItem}/>
				<BoardRegistModal isRegistOpen = {isRegistModalOpen} onRegistClose = {closeRegistModal}/>

			</div>
		</>
	);
}

export default Board;