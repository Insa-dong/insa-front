import Header from "../../component/common/Header";
import CSS from "./BoardDetail.module.css";

function BoardDetail() {

    const title = '공지사항';

    return (
        <>
            <Header title={title} />
            <div className={CSS.profile}>
            <div className="sideBox">

                <div id="prof"></div>

                <div className="sideTxt">
                    <span className="topName">김영한</span>
                    <span className="topAuth">행정팀 관리자</span>
                </div>
            </div>
            </div>
            <ul style={{ display: 'flex' }}>
                <li>제목</li>
                <li>2023-05-16</li>
            </ul>
            
        </>

    );
}

export default BoardDetail;