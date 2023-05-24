import { useEffect } from "react";
import Header from "../../component/common/Header";
import CSS from "./BoardDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callBoardDetailAPI } from "../../apis/BoardAPICall";

function BoardDetail() {

    const title = '공지사항';
    const { noticeCode } = useParams();
    const dispatch = useDispatch();
    const { detail } = useSelector(state => state.boardReducer);

    useEffect(
        () => {
            console.log(noticeCode);
            dispatch(callBoardDetailAPI({ noticeCode }));
        },
        []
    )

    return (
        <>
            <Header title={title} />
            {detail && (
                <div className={CSS.boardWrapper} key={detail.noticeCode}>
                    <div className={CSS.profile}>
                        <div className="sideBox">

                            <div id="prof"></div>

                            <div className="sideTxt">
                                <span className="topName">{detail.noticeWriter.empName}</span>
                                <span className="topAuth">{detail.noticeWriter.dept.deptName}팀</span>
                                <span className="topJob">{detail.noticeWriter.job.jobName}</span>
                            </div>
                        </div>
                    </div>
                    <ul style={{ display: 'flex' }}>
                        <li className={CSS.title}>{detail.noticeTitle}</li>
                        <li className={CSS.date}>{detail.noticeWriteDate}</li>
                    </ul>
                    <div className={CSS.maincontent}>
                        <div className={CSS.maintext}>{detail.noticeContent}</div>
                    </div>

                    {Array.isArray(detail.fileList) && detail.fileList.length > 0 ? (
                        detail.fileList.map((file) => (
                            <ul style={{display: 'flex'}} key={file.fileCode}>
                                <li>{file.originFileName}</li>
                            </ul>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">첨부파일이 없습니다.</td>
                        </tr>
                    )}
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
            )}

        </>

    );
}

export default BoardDetail;