import { useEffect, useState } from "react";
import './StudentDetail.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callStudentDetailForAdminAPI, callStudentUpdateAPI } from "../../apis/StudentAPICalls";
import Header from "../../component/common/Header";
import { callEvaDeleteForAdminAPI, callStudentEvaListAPI } from "../../apis/EvaAPICalls";
import { callAdviceDeleteForAdminAPI, callStudentAdviceListAPI } from "../../apis/AdviceAPICalls";
import { callStudyStuDeleteAdminAPI, callStudyStuListAPI } from "../../apis/StudyStuAPICalls";
import AdviceReviewModal from "../../component/modal/AdviceReviewModal";
import EvaReviewCheckModal from "../../component/modal/EvaReviewCheckModal";
import StudyStudentRegistModal from "../../component/modal/StudyStudentRegistModal";
import StudyStudentUpdateModal from "../../component/modal/StudyStudentUpdateModal";
import Swal from "sweetalert2";

const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
        return;
    }
    if (onCancel && typeof onCancel !== "function") {
        return;
    }

    const confirmAction = () => {
        if (window.confirm(message)) {
            onConfirm();
        } else {
            onCancel();
        }
    };

    return confirmAction;
};

function StudentDetail() {

    const title = '수강생';
    const dispatch = useDispatch();
    const params = useParams();
    const stuCode = params.stuCode;
    const navigate = useNavigate();
    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});
    const { detail } = useSelector(state => state.studentReducer);
    const { modify } = useSelector(state => state.studentReducer);
    const [currentPage, setCurrentPage] = useState();
    const [adviceReviewModal, setAdviceReviewModal] = useState(false);
    const [selectedAdviceReview, setSelectedAdviceReview] = useState(null);
    const [adviceReviewModalVisible, setAdviceReviewModalVisible] = useState(false);
    const [selectedEvaReview, setSelectedEvaReview] = useState(null);
    const [evaReviewModalVisible, setEvaReviewModalVisible] = useState(false);
    const { studyList } = useSelector(state => state.studyStudentReducer);
    const { adviceList } = useSelector(state => state.adviceReducer);
    const { evaList } = useSelector(state => state.evaReducer);
    const [selectedRegistStudy, setSelectedRegistStudy] = useState(null);
    const [registModalVisible, setRegistModalVisible] = useState(false);
    const [studyStudentRegist, setStudyStudentRegist] = useState("");
    const [selectedUpdateStudy, setSelectedUpdateStudy] = useState(null);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [studyStudentUpdate, setStudyStudentUpdate] = useState("");

  
    const evaDelete = (evaCode) => {
    const confirmed = window.confirm("평가 내역을 삭제하시겠습니까?");
    if (confirmed) {
      console.log('evaCode : ', evaCode);
      dispatch(callEvaDeleteForAdminAPI({ evaCode }));
      window.location.reload();
    } else {
      console.log("평가 삭제가 취소되었습니다.");
    }
  };

  const adviceDelete = (adviceLogCode) => {
    const confirmed = window.confirm("상담 내역을 삭제하시겠습니까?");
    if (confirmed) {
      console.log('adviceLogCode : ', adviceLogCode);
      dispatch(callAdviceDeleteForAdminAPI({ adviceLogCode }));
      window.location.reload();
    } else {
      console.log("상담 삭제가 취소되었습니다.");
    }
  };

  const studyStuDelete = (stuCode, studyCode) => {
    const confirmed = window.confirm("강의 내역을 삭제하시겠습니까?");
    if (confirmed) {
      console.log('studyCode : ', studyCode);
      console.log('stuCode : ', stuCode);
      dispatch(callStudyStuDeleteAdminAPI({ studyCode, stuCode }));
    } else {
      console.log("강의 삭제가 취소되었습니다.");
    }
  };



    const onClickAdviceReviewHandler = (adviceReview) => {
        setSelectedAdviceReview(adviceReview);
        setAdviceReviewModalVisible(true);
    };


    const onClickEvaReviewHandler = (evaReview) => {
        setSelectedEvaReview(evaReview);
        setEvaReviewModalVisible(true);
    }

    const onClickRegistHandler = (studyStudentRegist) => {
        setSelectedRegistStudy(studyStudentRegist);
        console.log(stuCode);
        setRegistModalVisible(true);
    }

    
    const onClickUpdateStudyStuHandler = (study) => {
        setSelectedUpdateStudy(study);
        setUpdateModalVisible(true);
    };


    useEffect(
        () => {
            dispatch(callStudentDetailForAdminAPI({ stuCode }));
            dispatch(callStudyStuListAPI({ stuCode, currentPage }));
            dispatch(callStudentEvaListAPI({ stuCode, currentPage }));
            dispatch(callStudentAdviceListAPI({ stuCode, currentPage }));
        },
        [currentPage]
    );



    useEffect(
        () => {
            if (modify?.status === 200) {
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
                        Swal.fire({
                            title: '수정이 완료 되었습니다.',
                            icon: 'success',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'custom-success-button'
                            }
                        }).then(() => {
                            navigate('/student');
                        }).catch((error) => {
                            Swal.fire(
                                '저장 실패',
                                '다시 시도하세요.',
                                'error'
                            );
                        });
                    }
                });
            };
        },
        [modify]
    );

    /* 수정 모드 변경 */
    const onClickmodifyModeHandler = () => {
        setModifyMode(true);
        setForm({ ...detail });
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    /* 수정 저장 버튼 클릭 이벤트 */
    const onClickStudentUpdateHandler = () => {

        const formData = new FormData();

        formData.append("stuCode", form.stuCode || "");
        formData.append("stuName", form.stuName|| "");
        formData.append("stuEngName", form.stuEngName || "");
        formData.append("stuBirth", form.stuBirth || "");
        formData.append("stuEndSchool", form.stuEndSchool || "");
        formData.append("stuEmail", form.stuEmail || "");
        formData.append("stuPhone", form.stuPhone || "");

        dispatch(callStudentUpdateAPI(form));
    }

    return (
        <>
            <Header title={title} />
            <div className="allWrapper">
                {detail && (
                    <>
                        <table>
                            <tbody>
                                <tr>
                                    <td>이름</td>
                                    <td>
                                        <input className={`stuDetailBox ${modifyMode ? 'modifyMode' : ''}`}
                                            name='stuName'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (detail.stuName || "") : form.stuName}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>영문이름</td>
                                    <td>
                                        <input className={`stuDetailBox ${modifyMode ? 'modifyMode' : ''}`}
                                            name='stuEngName'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (detail.stuEngName || "") : form.stuEngName}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>생년월일</td>
                                    <td>
                                        <input className={`stuDetailBox ${modifyMode ? 'modifyMode' : ''}`}
                                            name='stuBirth'
                                            type='date'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (detail.stuBirth || "") : form.stuBirth}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>학력</td>
                                    <td>
                                        <input className={`stuDetailBox ${modifyMode ? 'modifyMode' : ''}`}
                                            name='stuEndSchool'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (detail.stuEndSchool || "") : form.stuEndSchool}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>이메일</td>
                                    <td>
                                        <input className={`stuDetailBox ${modifyMode ? 'modifyMode' : ''}`}
                                            name='stuEmail'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (detail.stuEmail || "") : form.stuEmail}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>전화번호</td>
                                    <td>
                                        <input className={`stuDetailBox ${modifyMode ? 'modifyMode' : ''}`}
                                            name='stuPhone'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (detail.stuPhone || "") : form.stuPhone}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br>
                        {!modifyMode &&
                            <button className="stuDetailUpdateBtn"
                                onClick={onClickmodifyModeHandler}
                            >
                                수정하기
                            </button>}
                        {modifyMode &&
                            <button className="stuDetailUpdateBtn"
                                onClick={onClickStudentUpdateHandler}
                            >
                                수정
                            </button>
                        }
                    </>
                )}

                {registModalVisible && (
                    <StudyStudentRegistModal
                        studyStudentRegist={selectedRegistStudy}
                        setStudyStudentRegistModal={setRegistModalVisible}
                        stuCode={stuCode}
                    />
                )}

                <div className="studyHeaderContainer">
                    <h2 className="studyHeader">과정 내역</h2>
                    <button className="registrationButton" onClick={() => onClickRegistHandler(studyStudentRegist)}>등록</button>

                </div>

                {updateModalVisible && (
                    <StudyStudentUpdateModal
                        studyStudentUpdate={selectedUpdateStudy}
                        setStudyStudentUpdateModal={setUpdateModalVisible}
                        stuCode={stuCode}
                    />
                )}

                <table className="stuDetailDiv">
                    <thead>
                        <tr>
                            <th>과정 이름</th>
                            <th>회차</th>
                            <th>수정/삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(studyList) && studyList.length > 0 ? (
                            studyList.map((study) => (
                                <tr key={study.studyCode}>
                                    <td>{study.trainingTitle}</td>
                                    <td>{study.studyCount}</td>
                                    <td>
                                        <button className="studyStuUpdateBtn" onClick={() => onClickUpdateStudyStuHandler(study)}>수정</button>
                                        <button className="studyStuDeleteBtn" onClick={() => studyStuDelete(study.student.stuCode, study.studyCode)}>삭제</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">수강 중인 강의가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {evaReviewModalVisible && (
                    <EvaReviewCheckModal
                        evaReview={selectedEvaReview}
                        setEvaReviewModal={setEvaReviewModalVisible}
                    />
                )}

                <h2 className="studyHeader">평가 내역</h2>
                <table className="stuDetailDiv">
                    <thead>
                        <tr>
                            <th>평가 코드</th>
                            <th>강의 이름</th>
                            <th>강사명</th>
                            <th>작성 일</th>
                            <th>조회/삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(evaList) && evaList.length > 0 ? (
                            evaList.map((eva) => (
                                <tr key={eva}>
                                    <td>{eva.evaCode}</td>
                                    <td>{eva.studyInfo.studyTitle}</td>
                                    <td>{eva.studyInfo.teacher.empName}</td>
                                    <td>{eva.evaWriteDate}</td>
                                    <td>
                                        <button className="evaSelectBtn" onClick={() => onClickEvaReviewHandler(eva)}>조회</button>
                                        <button className="evaDeleteBtn" onClick={() => evaDelete(eva.evaCode)}>삭제</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">평가 내역이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {adviceReviewModalVisible && (
                    <AdviceReviewModal
                        adviceReview={selectedAdviceReview}
                        setAdviceReviewModal={setAdviceReviewModalVisible}
                    />
                )}

                <h2 className="studyHeader">상담 내역</h2>
                <table className="stuDetailDiv">
                    <thead>
                        <tr>
                            <th>일지 코드</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회/삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(adviceList) && adviceList.length > 0 ? (
                            adviceList.map((advice) => (
                                <tr key={advice}>
                                    <td>{advice.adviceLogCode}</td>
                                    <td>{advice.writer.empName}</td>
                                    <td>{advice.adviceLogDate}</td>
                                    <td>
                                        <button className="adviceSelectBtn" onClick={() => onClickAdviceReviewHandler(advice)}>조회</button>
                                        <button className="adviceDeleteBtn" onClick={() => adviceDelete(advice.adviceLogCode)}>삭제</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">상담 내역이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br></br><br></br>
                <button className="stubeforeBtn"
                    onClick={() => navigate(-1)}>
                    이전으로</button>
            </div>
        </>
    );
}


export default StudentDetail;