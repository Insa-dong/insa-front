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
    const data = useSelector(state => state.studentReducer);
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

    const okAdviceConfirm = () => {
        dispatch(callAdviceDeleteForAdminAPI(stuCode));
    };

    const cancelAdviceConfirm = () => {
        console.log("상담 삭제가 취소되었습니다.");
    };

    const okEvaConfirm = () => {
        dispatch(callEvaDeleteForAdminAPI(stuCode));
    };

    const cancelEvaConfirm = () => {
        console.log("평가 삭제가 취소되었습니다.");
    };

    const adviceDelete = useConfirm(
        "상담 내역을 삭제하시겠습니까?",
        okAdviceConfirm,
        cancelAdviceConfirm
    );

    const evaDelete = useConfirm(
        "평가 내역을 삭제하시겠습니까?",
        okEvaConfirm,
        cancelEvaConfirm
    );

    const okStudyStuConfirm = () => {
        dispatch(callStudyStuDeleteAdminAPI(stuCode));
    }

    const cancelStudyStuConfirm = () => {
        console.log("수강생 강의 삭제가 취소되었습니다.");
    };

    const studyStuDelete = useConfirm(
        "수강생 강의를 삭제하시겠습니까?",
        okStudyStuConfirm,
        cancelStudyStuConfirm
    );


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
        setRegistModalVisible(true);
    }

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
                alert('수강생 정보 수정이 완료 되었습니다.');
            }
        },
        [modify]
    );


    /* 수정 모드 변경 */
    const onClickmodifyModeHandler = () => {
        setModifyMode(true);
        setForm({ ...data });
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

        formData.append("stuCode", form.stuCode);
        formData.append("stuName", form.stuName);
        formData.append("stuEngName", form.stuEngName);
        formData.append("stuBirth", form.stuBirth);
        formData.append("stuEndSchool", form.stuEndSchool);
        formData.append("stuEmail", form.stuEmail);
        formData.append("stuPhone", form.stuPhone);

        dispatch(callStudentUpdateAPI(formData));
    }

    return (
        <>
            <Header title={title} />
            <div className="allWrapper">
                {data && (
                    <>
                        <table>
                            <tbody>
                                <tr>
                                    <td>이름</td>
                                    <td>
                                        <input className="stuDetailBox"
                                            name='stuName'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (data.stuName || "") : form.stuName}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>영문이름</td>
                                    <td>
                                        <input className="stuDetailBox"
                                            name='stuEngName'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (data.stuEngName || "") : form.stuEngName}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>생년월일</td>
                                    <td>
                                        <input className="stuDetailBox"
                                            name='stuBirth'
                                            type='date'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (data.stuBirth || "") : form.stuBirth}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>학력</td>
                                    <td>
                                        <input className="stuDetailBox"
                                            name='stuEndSchool'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (data.stuEndSchool || "") : form.stuEndSchool}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>이메일</td>
                                    <td>
                                        <input className="stuDetailBox"
                                            name='stuEmail'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (data.stuEmail || "") : form.stuEmail}
                                            readOnly={!modifyMode}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>전화번호</td>
                                    <td>
                                        <input className="stuDetailBox"
                                            name='stuPhone'
                                            type='text'
                                            onChange={onChangeHandler}
                                            value={!modifyMode ? (data.stuPhone || "") : form.stuPhone}
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
                    <button className="registrationButton" onClick={onClickRegistHandler}>등록</button>
                </div>
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
                                <tr key={study}>
                                    <td>{study.trainingTitle}</td>
                                    <td>{study.trainingCount}</td>
                                    <td>
                                        <button className="studyStuUpdateBtn">수정</button>
                                        <button className="studyStuDeleteBtn" onClick={studyStuDelete}>삭제</button>
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
                        setEvaReviewModal={setAdviceReviewModalVisible}
                    />
                )}

                <h2 className="studyHeader">평가 내역</h2>
                <table className="stuDetailDiv">
                    <thead>
                        <tr>
                            <th>평가 코드</th>
                            <th>강의 이름</th>
                            <th>강사명</th>
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
                                    <td>
                                        <button className="evaSelectBtn" onClick={() => onClickEvaReviewHandler(eva)}>조회</button>
                                        <button className="evaDeleteBtn" onClick={evaDelete}>삭제</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">평가 내역이 없습니다.</td>
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
                                        <button className="adviceDeleteBtn" onClick={adviceDelete}>삭제</button>
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