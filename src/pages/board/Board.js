import Header from "../../component/common/Header";
import CSS from "./Board.module.css";

function Board() {

  const title = '공지사항';

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
          <div id={CSS.prof}></div>
          <div>
            <img src="/images/공지사항제목.png" className={CSS.boardImg} alt="공지사항제목이미지" />
            <div className={CSS.title}>제목</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;