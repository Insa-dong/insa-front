import { useEffect, useState } from "react";
import Header from "../../component/common/Header";
import CSS from "./Board.module.css";
import BoardDetailModal from './../../component/modal/BoardDetailModal';
import PagingBar from "../../component/common/PagingBar";
import { useDispatch, useSelector } from "react-redux";
import { callBoardListAPI, callBoardSearchAPI } from "../../apis/BoardAPICall";
import boardReducer from "../../modules/BoardModule";

function Board() {

  const title = '공지사항';
  const dispatch = useDispatch();
  const board = useSelector(state => state.boardReducer);
  const { data } = useSelector(state => state.boardReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchOption, setSearchOption] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');


  /* 검색 옵션 상태 저장 */
  const onSearchOptionChangeHandler = (e) => {
    setSearchOption(e.target.value);
    console.log('searchOption : ', searchOption)
  }

  /* 검색어 입력값 상태 저장*/
  const onSearchChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  }

  /* 검색버튼 누르면 검색화면으로 넘어가는 이벤트 */
  const onClickSearchHandler = (e) => {
    console.log('searchKeyword: ', searchKeyword);
    console.log('searchOption : ', searchOption);
    dispatch(callBoardSearchAPI({ searchOption, searchKeyword, currentPage }));
  }

  useEffect(
    () => {
      dispatch(callBoardListAPI({ currentPage }));
    },
    [currentPage]
  );



  return (
    <>
      <Header title={title} />
      <div className={CSS.boardWrapper}>
        <div className="StuSearchBox">
          <select
            id="StuSelect"
            onChange={onSearchOptionChangeHandler}
          >
            <option value="all">전체</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="writer">작성자</option>
          </select>

          <input
            type="text"
            id="search"
            placeholder=" 검색어를 입력하세요"
            onChange={onSearchChangeHandler}
          />
          <button className="StuSearchBtn">
            <img
              src="/images/search.png"
              alt="검색"
              onClick={onClickSearchHandler} />
          </button>
        </div>
        <div className={CSS.topline}></div>

        {data && data.map(p => (
          <div key={p.noticeCode} className={CSS.mainContent}>
            <ul style={{ display: 'flex' }}>
              <li id={CSS.prof}></li>
              <li>
                <ul>
                  <ul style={{ display: 'flex' }}>
                    <li>
                      <ul style={{ display: 'flex' }}>
                        <li><img src="/images/공지사항제목.png" className={CSS.boardImg} alt="공지사항제목이미지" /></li>
                        <li className={CSS.title}>{p.noticeTitle}</li>
                      </ul>
                    </li>
                    <li className={CSS.date}>{p.noticeWriteDate}</li>
                  </ul>
                  <li className={CSS.writer}>{p.noticeWriter.empName}</li>
                  <li className={CSS.content}>{p.noticeContent}</li>
                </ul>
              </li>
            </ul>
          </div>))
        }


        <div className="EmpPaging">
          {board.pageInfo && <PagingBar pageInfo={board.pageInfo} setCurrentPage={setCurrentPage} />}
        </div>
      </div>
    </>
  );
}

export default Board;