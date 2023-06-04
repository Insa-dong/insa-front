import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {callBoardDeleteAPI, callBoardDetailAPI, callBoardUpdateAPI, callDeleteFileAPI} from "../../apis/BoardAPICall";
import Header from "../../component/common/Header";
import {getMemberId, isAdmin} from "../../utils/TokenUtils";
import CSS from "./BoardDetail.module.css";

function formatDate(dateString) {
	const date = new Date(dateString);
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		weekday: "short",
		hour12: false
	};
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
    const [deleteFile, setDeleteFile] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [beforeFiles, setBeforeFiles] = useState([]);
    const memberId = getMemberId();
    const admin = isAdmin();

    const isAuthor = detail?.noticeWriter?.empId === memberId;
    console.log('memberId : ', memberId)
    console.log('isAuthor : ', isAuthor)
    console.log('admin : ', admin);

    console.log(detail);
    console.log(deleteFile);

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
        Swal.fire({
			text: '수정 하시겠습니까?',
			icon: 'warning',
			showCancelButton: true,
			customClass: {
				confirmButton: 'custom-confirm-button',
				cancelButton: 'custom-cancel-button'
			},
			confirmButtonColor: '#8CBAFF',
			cancelButtonColor: '#DADADA',
			confirmButtonText: '확인',
			cancelButtonText: '취소',
			reverseButtons: true,
			buttonsStyling: false,
		}).then((result) => {
			if (result.isConfirmed) {
                dispatch(callBoardUpdateAPI(formData));
                dispatch(callDeleteFileAPI(deleteFile));
				Swal.fire({
					title: '수정 완료',
					icon: 'success',
					buttonsStyling: false,
					customClass: {
						confirmButton: 'custom-success-button'
					}
				})
					.then(() => {
						window.location.reload();
					})
			} 
		});

    }

    const onClickDeleteHandler = () => {
        Swal.fire({
			text: '삭제 하시겠습니까?',
			icon: 'warning',
			showCancelButton: true,
			customClass: {
				confirmButton: 'custom-confirm-button',
				cancelButton: 'custom-cancel-button'
			},
			confirmButtonColor: '#8CBAFF',
			cancelButtonColor: '#DADADA',
			confirmButtonText: '확인',
			cancelButtonText: '취소',
			reverseButtons: true,
			buttonsStyling: false,
		}).then((result) => {
			if (result.isConfirmed) {
                dispatch(callBoardDeleteAPI(noticeCode));
				Swal.fire({
					title: '삭제 완료',
					icon: 'success',
					buttonsStyling: false,
					customClass: {
						confirmButton: 'custom-success-button'
					}
				})
					.then(() => {
                        navigate("/board")
                        window.location.reload();
					})
			} 
		});
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
        setDeleteFile((prevFiles) => [...prevFiles, fileName.saveFileName]);
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
                    onClick={(e) => {

                        handleClearBeforeFile(fileName)
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
                            className={!modifyMode ? CSS.title : CSS.titleModify}
                            value={!modifyMode ? detail.noticeTitle : form.noticeTitle}
                            readOnly={!modifyMode}
                            autoComplete='off'
                            onChange={onChangeHandler}
                        />
                        <ul style={{ display: 'flex', flexDirection: 'column', marginLeft: '7vw' }}>
                            <ul style={{ display: 'flex', paddingBottom: '1vh' }}>
                                <li>작성일 : </li>
                                <li className={CSS.date}>{formatDate(detail.noticeWriteDate)}</li>
                            </ul>
                            {detail.noticeModifyDate !== null && (
                                <ul style={{ display: 'flex', color: 'gray' }}>
                                    <li>수정일 : </li>
                                    <li className={CSS.date}>{formatDate(detail.noticeModifyDate)}</li>
                                </ul>
                            )}

                        </ul>
                    </ul>
                    <div className={CSS.maincontent}>
                        <textarea
                            name="noticeContent"
                            placeholder='내용'
                            maxLength='1000'
                            className={!modifyMode ? CSS.maintext : CSS.maintextModify}
                            value={!modifyMode ? detail.noticeContent : form.noticeContent}
                            readOnly={!modifyMode}
                            onChange={onChangeHandler}
                        />
                        {modifyMode && (
                            <div className={CSS.characterCount}>
                                {form.noticeContent.length}/{1000}자
                            </div>
                        )}
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
                                    <div className={CSS.fileNone}>
                                        <div colSpan="3">첨부파일이 없습니다.</div>
                                    </div>
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
                    {!modifyMode && (
                        <div className={CSS.btn}>
                            {isAuthor && (
                                <>
                                    <button
                                        className={CSS.updateBtn}
                                        onClick={onClickModifyModeHandler}
                                    >
                                        수정하기
                                    </button>

                                    <button
                                        className={CSS.deleteBtn}
                                        onClick={onClickDeleteHandler}
                                    >
                                        삭제하기
                                    </button>

                                </>
                            )}
                            {admin.length > 0 && !isAuthor && (
                                <button
                                    className={CSS.deleteBtn}
                                    onClick={onClickDeleteHandler}
                                >
                                    삭제하기
                                </button>
                            )}
                        </div>
                    )}

                    {modifyMode &&
                        <div className={CSS.btn}>
                            <button
                                className={CSS.updateBtn}
                                onClick={onClickProductUpdateHandler}
                            >
                                수정완료
                            </button>
                            <button className={CSS.deleteBtn}
                                onClick={() => { setModifyMode(false) }}
                            >
                                수정취소
                            </button>
                        </div>
                    }
                </div>
            )}

        </>

    );
}

export default BoardDetail;