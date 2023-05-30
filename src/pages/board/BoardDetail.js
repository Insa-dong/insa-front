import { useEffect, useRef, useState } from "react";
import Header from "../../component/common/Header";
import CSS from "./BoardDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callBoardDeleteAPI, callBoardDetailAPI, callBoardUpdateAPI, callDeleteFileAPI, fileDownloadAPI } from "../../apis/BoardAPICall";

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", weekday: "short", hour12: false };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
}


function BoardDetail() {

    const title = '공지사항';
    const fileInputRef = useRef(null);
    const { noticeCode } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { detail } = useSelector(state => state.boardReducer);
    const { update } = useSelector(state => state.boardReducer);
    const { erase } = useSelector(state => state.boardReducer);
    const [form, setForm] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [beforeFiles, setBeforeFiles] = useState([]);

    // const allFiles = beforeFiles.concat(selectedFiles);

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({ ...detail });
    }

    const onClickProductUpdateHandler = () => {
        const formData = new FormData();
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        formData.append("noticeTitle", form.noticeTitle);
        formData.append("noticeContent", form.noticeContent);
        formData.append("noticeCode", noticeCode);
        // FormData에 파일 추가
        selectedFiles.forEach((file, index) => {
            formData.append(`noticeFile[${index}]`, file);
        });

        console.log(formData);


        dispatch(callBoardUpdateAPI(formData));

        // 페이지 새로고침
        window.location.reload();
    }

    const onClickDeleteHandler = () => {
        dispatch(callBoardDeleteAPI(noticeCode));

        navigate("/board")
        window.location.reload();
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }


    /* 공지 수정하기 버튼 클릭 이벤트 */
    const handleFile = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    }

    const handleClearFile = (fileName) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== fileName)
        );
    };
    const handleClearBeforeFile = (fileName) => {
        setBeforeFiles((prevFiles) =>
            prevFiles.filter((file) => file !== fileName)
        );
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const renderFiles = () => {
        return selectedFiles.map((file) => (
            <div key={file.name}>
                {file.name}
                <button onClick={() => handleClearFile(file.name)}>X</button>
            </div>
        ));
    };

    const renderBeforeFiles = () => {
        return beforeFiles.map((fileName) => (
            <div key={fileName.originFileName}>
                {fileName.originFileName}
                <button
                    onClick={() => {

                        handleClearBeforeFile(fileName)
                        dispatch(callDeleteFileAPI(fileName.saveFileName));
                    }
                    }
                >
                    X
                </button>
            </div>
        ));
    };

    useEffect(() => {
        if (detail && detail.fileList) {
            const files = detail.fileList.map((file) => ({
                originFileName: file.originFileName,
                saveFileName: file.saveFileName
            }));
            setBeforeFiles(files);
        }
    }, [detail]);



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
                        <input
                            name="noticeTitle"
                            placeholder='제목'
                            className={CSS.title}
                            value={!modifyMode ? detail.noticeTitle : form.noticeTitle}
                            readOnly={!modifyMode}
                            onChange={onChangeHandler}
                        />
                        <li className={CSS.date}>{formatDate(detail.noticeWriteDate)}</li>
                    </ul>
                    <div className={CSS.maincontent}>
                        <input
                            name="noticeContent"
                            placeholder='내용'
                            className={CSS.maintext}
                            value={!modifyMode ? detail.noticeContent : form.noticeContent}
                            readOnly={!modifyMode}
                            onChange={onChangeHandler}
                        />
                    </div>

                    {!modifyMode ?
                        (
                            <div style={{ display: 'flex' }}>
                                <img
                                    src="/images/파일첨부.png"
                                    className={CSS.fileImgg}
                                    alt="파일첨부이미지"
                                />

                                {(Array.isArray(detail.fileList) && detail.fileList.length > 0 ? (
                                    detail.fileList.map((file, index) => (
                                        <ul className={CSS.file} style={{ display: 'flex' }} key={file.fileCode}>
                                            {index > 0 && <li>,&nbsp;&nbsp;&nbsp;</li>}
                                            <a href={`http://localhost:8001/insa/v1/download/${file.saveFileName}`}><li>{file.originFileName}</li></a>
                                        </ul>
                                    ))
                                ) : (
                                    <tr className={CSS.file}>
                                        <td colSpan="3">첨부파일이 없습니다.</td>
                                    </tr>
                                ))}
                            </div>
                        )

                        :

                        (
                            <>
                                <img
                                    src="/images/파일첨부.png"
                                    className={CSS.fileImgg}
                                    alt="파일첨부이미지"
                                    onClick={handleImageClick}
                                />
                                <div style={{ display: 'flex' }}>
                                    <div className={CSS.file}>{renderBeforeFiles()}</div>
                                    <div className={CSS.file}>{renderFiles()}</div>
                                    <input
                                        ref={fileInputRef}
                                        className={CSS.file}
                                        multiple="multiple"
                                        type="file"
                                        name="noticeFile"
                                        style={{ display: "none" }}
                                        onChange={handleFile}
                                    />
                                </div>
                            </>
                        )
                    }
                    {!modifyMode &&

                        <div className={CSS.btn}>
                            <button className={CSS.updateBtn}
                                onClick={onClickModifyModeHandler}
                            >
                                수정하기
                            </button>
                            <button className={CSS.deleteBtn}
                                onClick={onClickDeleteHandler}
                            >
                                삭제하기
                            </button>
                        </div>
                    }

                    {modifyMode &&
                        <div className={CSS.btn}>
                            <button
                                className={CSS.updateBtn}
                                onClick={onClickProductUpdateHandler}
                            >
                                수정완료
                            </button>
                        </div>
                    }
                </div>
            )}

        </>

    );
}

export default BoardDetail;