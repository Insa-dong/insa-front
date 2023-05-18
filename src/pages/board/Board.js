import { useEffect, useState } from "react";
import Header from "../../component/common/Header";
import CSS from "./Board.module.css";
import BoardDetailModal from './../../component/modal/BoardDetailModal';
import PagingBar from "../../component/common/PagingBar";
import { useDispatch, useSelector } from "react-redux";
import { callBoardListAPI } from "../../apis/BoardAPICall";
import boardReducer from "../../modules/BoardModule";

function Board() {

  const title = '공지사항';
  const dispatch = useDispatch();
  const boardlist = useSelector(state => state.boardReducer);
  console.log('boardlist: ', boardlist);
  const [currentPage, setCurrentPage] = useState(1);
  // const { data, pageInfo } = useSelector(state => state.productReducer);
  // const [currentPage, setCurrentPage] = useState(1);

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
          <select id="StuSelect">
            <option value="all">전체</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="author">작성자</option>
          </select>

          <input type="text" id="search" placeholder=" 검색어를 입력하세요" />
          <button className="StuSearchBtn">
            <img src="/images/search.png" alt="검색" />
          </button>
        </div>
        <div className={CSS.topline}></div>

        <div className={CSS.mainContent}>
          <ul style={{ display: 'flex' }}>
            <li id={CSS.prof}></li>
            <li>
              <ul>
                <ul style={{ display: 'flex' }}>
                  <li>
                    <ul style={{ display: 'flex' }}>
                      <li><img src="/images/공지사항제목.png" className={CSS.boardImg} alt="공지사항제목이미지" /></li>
                      <li className={CSS.title}>제목sdfaddddddddddddddddddddddddddddddddddd</li>
                    </ul>
                  </li>
                  <li className={CSS.date}>2023-05-16</li>
                </ul>
                <li className={CSS.writer}>작성자</li>
                <li className={CSS.content}>내용ddddddddddddddddddddddddddddddddddddddddddddd</li>
              </ul>
            </li>
          </ul>
        </div>
        {/* <div className="EmpPaging">
          {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
        </div> */}
      </div>
    </>
  );
}

export default Board;