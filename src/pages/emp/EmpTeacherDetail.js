import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import TeacherNavbar from "../../component/common/TeacherNavbar";
import { callSelectStudentAndAttendAPI } from "../../apis/StudyStuAPICalls";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CSS from './EmpTeacherDetail.module.css';
import PagingBar from "../../component/common/PagingBar";
import StudentAttendRegistModal from "../../component/modal/StudentAttendRegistModal";
import { callStudentAttendDeleteAPI, callStudentAttendSearchAPI } from "../../apis/AttendAPICalls";
import StudentAttendUpdateModal from "../../component/modal/StudentAttendUpdateModal";

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

function EmpTeacherDetail() {

    const title = '강의 별 수강생';
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState();
    const studyStudentState = useSelector(state => state.studyStudentReducer);
    const { studyCode } = useParams();
    const [selectedAttendReview, setSelectedAttendReview] = useState(null);
    const [attendReviewModalVisible, setAttendReviewModalVisible] = useState(false);
    const [selectedAttendUpdate, setSelectedAttendUpdate] = useState(null);
    const [attendUpdateModalVisible, setAttendUpdateModalVisible] = useState(false);
    const navigate = useNavigate();
    const [stuCode, setStuCode] = useState();
    const [attendCode, setAttendCode] = useState();
    const location = useLocation();
    const { item } = location.state;
    const [selectedDate, setSelectedDate] = useState('');

    console.log('studyCode : ', studyCode);
    console.log('stuCode : ', stuCode);
    console.log('attendCode : ', attendCode);

    useEffect(
        () => {
            /* 강의 별 수강생, 수강생 출결 */
            dispatch(callSelectStudentAndAttendAPI({ studyCode, currentPage }));
        },
        [currentPage, studyCode]
    );


    // const handleSearchDate = () => {
    //     if (selectedDate) {
    //         dispatch(callStudentAttendSearchAPI({ attendDate: selectedDate, currentPage }));
    //     }
    // };

    const handleSearchDate = () => {
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

        if (selectedDate === today) {
            dispatch(callStudentAttendSearchAPI({ attendDate: today, currentPage }));
        } else if (selectedDate) {
            dispatch(callStudentAttendSearchAPI({ attendDate: selectedDate, currentPage }));
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };


    const onClickRegistAttend = (attendReview, stuCode) => {
        setSelectedAttendReview({ ...attendReview, stuCode });
        setStuCode(stuCode);
        setAttendReviewModalVisible(true);
    };

    const onClickUpdateAttend = (attendUpdate, stuCode) => {
        setSelectedAttendUpdate({ ...attendUpdate, stuCode });
        setAttendUpdateModalVisible(true);
    }

    const okAttendConfirm = () => {
        dispatch(callStudentAttendDeleteAPI());
    }

    const cancelAttendConfirm = () => {
        console.log("수강생 출결 삭제가 취소되었습니다.");
    };

    const attendDelete = useConfirm(
        "수강생 출결을 삭제하시겠습니까?",
        okAttendConfirm,
        cancelAttendConfirm
    );


    const onClickStudentHandler = (stuCode) => {
        setStuCode(stuCode);
        navigate(`/empTeacher/detail/${studyCode}/${stuCode}`, { state: { item } });
    };


    return (
        <>
            <TeacherNavbar />
            <Header title={title} />

            {attendReviewModalVisible && (
                <StudentAttendRegistModal
                    studentAttendRegist={selectedAttendReview}
                    setStudentAttendRegistModal={setAttendReviewModalVisible}
                    studyCode={studyCode}
                    stuCode={stuCode}
                />
            )}

            {attendUpdateModalVisible && (
                <StudentAttendUpdateModal
                    studentAttendUpdate={selectedAttendUpdate}
                    setStudentAttendUpdateModal={setAttendUpdateModalVisible}
                    studyCode={studyCode}
                    stuCode={stuCode}
                    attendCode={attendCode}
                />
            )}

            <div className={CSS.attendSearchContainer}>
                <input className={CSS.attendSearchDate}
                    type="date"
                    name="selectDate"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <button className={CSS.attendSearchBtn} onClick={handleSearchDate}>
                    <img src="/images/search.png" alt="검색" />
                </button>
            </div>

            <div className={CSS.StuWrapper} >
                <table className="stuDiv">
                    <thead className="stuHead">
                        <tr>
                            <th>학생 코드</th>
                            <th>이름</th>
                            <th>회차</th>
                            <th>출결상태</th>
                            <th>출결등록</th>
                            <th>수정/삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studyStudentState.data && studyStudentState.data.studentList && studyStudentState.data.studentList.length > 0 ? (
                            studyStudentState.data.studentList.map((item) => {
                                const studentAttendances = studyStudentState.data.attendList.filter((attend) => attend.student.stuCode === item.student.stuCode);

                                studentAttendances.sort((a, b) => new Date(b.attendDate) - new Date(a.attendDate));

                                return (
                                    <tr key={item.student.stuCode}>
                                        <td onClick={() => onClickStudentHandler(item.student.stuCode)}>{item.student.stuCode}</td>
                                        <td onClick={() => onClickStudentHandler(item.student.stuCode)}>{item.student.stuName}</td>
                                        <td onClick={() => onClickStudentHandler(item.student.stuCode)}>{item.studyCount}</td>
                                        <td>
                                            {studentAttendances.length > 0 ? (
                                                <div>
                                                    <p>{studentAttendances[0].attendDate} {studentAttendances[0].attendStatus}</p>
                                                </div>
                                            ) : (
                                                <p>출결 정보가 없습니다.</p>
                                            )}
                                        </td>
                                        <td>
                                            <button className={CSS.attendRegistBtn} onClick={() => onClickRegistAttend(item, item.student.stuCode)}>등록</button>
                                        </td>
                                        <td>
                                            <button className={CSS.attendUpdateBtn} onClick={() => onClickUpdateAttend(item.student.stuCode)}>수정</button>
                                            <button className={CSS.attendDeleteBtn} onClick={attendDelete}>삭제</button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6">데이터가 없습니다.</td>
                            </tr>
                        )}

                    </tbody>
                </table>
                <div className={CSS.StuPaging}>
                    {studyStudentState.pageInfo && <PagingBar pageInfo={studyStudentState.pageInfo} setCurrentPage={setCurrentPage} />}
                </div>
            </div>
        </>
    );
}

export default EmpTeacherDetail;
