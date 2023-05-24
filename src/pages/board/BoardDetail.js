import { useEffect } from "react";
import Header from "../../component/common/Header";
import CSS from "./BoardDetail.module.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { callBoardDetailAPI } from "../../apis/BoardAPICall";

function BoardDetail() {

    const title = '공지사항';
    const { noticeCode } = useParams();
    const dispatch = useDispatch();
    
    useEffect(
        () => {
            dispatch(callBoardDetailAPI({ noticeCode }));
        },
        []
    )

    return (
        <>
            <Header title={title} />
            <div className={CSS.boardWrapper}>
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
                    <li className={CSS.title}>제목</li>
                    <li className={CSS.date}>2023-05-16</li>
                </ul>
                <div className={CSS.maincontent}>
                    <div className={CSS.maintext}>내용</div>
                </div>
                <div className={CSS.btn}>
                <div className="bbttnn">
                    <button id="loginBtn"
                        // onClick={onClickLogin}
                    >
                        수정하기
                    </button>
                    <button id="pwBtn"
                        // onClick={() => navigate("/pwsearch")}
                    >
                        삭제하기
                    </button>
                </div>
                </div>
            </div>

        </>

    );
}

export default BoardDetail;