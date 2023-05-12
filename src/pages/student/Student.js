import Header from "../../component/common/Header";
import {useEffect , useState} from "react";
import './Student.css';
import StudentList from '../../component/lists/StudentList';
import { useDispatch, useSelector } from "react-redux";
import { callStudentListAPI } from "../../apis/StudentAPICalls"; 


function Student() {
    
    const title = '수강생';
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const student = useSelector(state => state.studentReducer);

    useEffect(
        () => {
            dispatch(callStudentListAPI({ currentPage }));
        },
        []
    )
  

    return(
        <>
            <Header title = { title }/>
            <div className="StuWrapper">
                <div className="StuSearchBox">
                    <select id="StuSelect">
                        <option value="student">전체</option>
                        <option value="study">강의</option>
                    </select>

                    <input type="text" id="search" placeholder=" 검색어를 입력하세요"/>
                        <button className="StuSearchBtn">
                            <img src="/images/search.png" alt="검색"/>
                        </button>
                </div>
                {student && <StudentList key = {student.stuCode} student = {student}/>}
            </div>
        </>
    )
};

export default Student;