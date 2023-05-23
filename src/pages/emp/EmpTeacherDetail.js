import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import TeacherNavbar from "../../component/common/TeacherNavbar";
import { callSelectStudentForStudyAPI } from "../../apis/StudyStuAPICalls";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CSS from './EmpTeacherDetail.module.css';
import PagingBar from "../../component/common/PagingBar";

function EmpTeacherDetail() {

    const title = '강의 별 수강생';
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState();
    const studyStudentState = useSelector(state => state.studyStudentReducer);
    const { studyCode } = useParams();

    console.log(studyCode);

    useEffect(
        () => {
            dispatch(callSelectStudentForStudyAPI({ studyCode, currentPage }));
        },
        [currentPage, studyCode]
    );


    return (
        <>
            <TeacherNavbar />
            <Header title={title} />
            <div className={CSS.StuWrapper} >
                <table className="stuDiv">
                    <thead className="stuHead">
                        <tr>
                            <th>학생 코드</th>
                            <th>이름</th>
                            <th>수강등록일</th>
                            <th>수강 상태</th>
                            <th>출결</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studyStudentState.data && studyStudentState.data.length > 0 ? (
                            studyStudentState.data.map(item => (
                                <tr key={item.stuCode}>
                                    <td>{item.student.stuCode}</td>
                                    <td>{item.student.stuName}</td>
                                    <td>{item.studyEnrollDate}</td>
                                    <td>{item.studyState}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">등록된 수강생이 없습니다.</td>
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
