import { useEffect } from "react";
import Header from "../../component/common/Header";
import CSS from "./BoardDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callBoardDetailAPI, fileDownloadAPI } from "../../apis/BoardAPICall";

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", weekday: "short", hour12: false };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
}

function BoardDetail() {

    const title = '공지사항';
    const { noticeCode } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

                            <div id={CSS.deptCode} className={`${CSS[`deptCode-${detail.noticeWriter.dept.deptCode}`]}`}>{detail.noticeWriter.empName.slice(-2)}</div>

                            <div className="sideTxt">
                                <span className="topName">{detail.noticeWriter.empName}</span>
                                <span className="topAuth">{detail.noticeWriter.dept.deptName}팀·</span>
                                <span className={CSS.job}>{detail.noticeWriter.job.jobName}</span>
                            </div>
                        </div>
                    </div>
                    <ul style={{ display: 'flex' }}>
                        <li className={CSS.title}>{detail.noticeTitle}</li>
                        <li className={CSS.date}>{formatDate(detail.noticeWriteDate)}</li>
                    </ul>
                    <div className={CSS.maincontent}>
                        <div className={CSS.maintext}>{detail.noticeContent}</div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <img
                            src="/images/파일첨부.png"
                            className={CSS.fileImgg}
                            alt="파일첨부이미지"
                        />
                        {Array.isArray(detail.fileList) && detail.fileList.length > 0 ? (
                            detail.fileList.map((file, index) => (
                                <ul className={CSS.file} style={{ display: 'flex' }} key={file.fileCode}>
                                    {index > 0 && <li>,&nbsp;</li>}
                                    <a href={`http://localhost:8001/insa/v1/download/${file.saveFileName}`}><li>{file.originFileName}</li></a>
                                </ul>
                            ))
                        ) : (
                            <tr className={CSS.file}>
                                <td colSpan="3">첨부파일이 없습니다.</td>
                            </tr>
                        )}

                    </div>
                    <div className={CSS.btn}>
                            <button className={CSS.updateBtn}
                            // onClick={onClickLogin}
                            >
                                수정하기
                            </button>
                            <button className={CSS.deleteBtn}
                            // onClick={() => navigate("/pwsearch")}
                            >
                                삭제하기
                            </button>
                    </div>
                </div>
            )}

        </>

    );
}

export default BoardDetail;