import Header from "../../component/common/Header";
import { useEffect, useState } from "react";
import './Student.css';
import StudentList from '../../component/lists/StudentList';
import { useDispatch, useSelector } from "react-redux";
import { callStudentListAPI, callStudentSearchListAPI } from "../../apis/StudentAPICalls";
import { useNavigate, useSearchParams } from "react-router-dom";
import PagingBar from "../../component/common/PagingBar";

function Student() {

    const title = '수강생';
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const student = useSelector(state => state.studentReducer);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('value');
    // const [searchType, setSearchType] = useState('student');


    useEffect(
        () => {
            dispatch(callStudentListAPI({ currentPage }));

        },
        [currentPage, dispatch]
    )

    const onClickSearchStudents = () => {
        dispatch(callStudentSearchListAPI({ search: document.getElementById("search").value, currentPage }));
    };

    // const onClickSearchStudents = () => {
    //     if (searchType === 'student') {
    //         dispatch(callStudentSearchListAPI({ search, currentPage }));
    //     } else if (searchType === 'study') {
    //     }
    // };

    return (
        <>
            <Header title={title} />
            <div className="StuWrapper">
                <div className="StuSearchBox">
                    <select id="StuSelect">
                        <option value="student">전체</option>
                        <option value="study">이름</option>
                    </select>

                    <input type="text" id="search" placeholder=" 검색어를 입력하세요" />
                    <button className="StuSearchBtn" onClick={onClickSearchStudents}>
                        <img src="/images/search.png" alt="검색" />
                    </button>
                </div>
                <div>
                    {student && <StudentList key={student.stuCode} student={student} />}
                </div>
                <div className = "StuPaging">
                    {student.pageInfo && <PagingBar pageInfo={student.pageInfo} setCurrentPage={setCurrentPage} />}
                    </div>
                    <div>
                    <button className="stuEntBtn" onClick={() => navigate('/student/registration')}>+ 수강생 추가</button>
                </div>
            </div>
        </>
    )
};

export default Student;