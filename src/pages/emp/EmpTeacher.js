import { useDispatch, useSelector } from "react-redux";
import { callSelectStudyForTeacherAPI } from "../../apis/StudyInfoAPICalls";
import Header from "../../component/common/Header";
import TeacherNavbar from "../../component/common/TeacherNavbar";
import { useEffect, useState } from "react";
import PagingBar from "../../component/common/PagingBar";
import EmpTeacherList from "../../component/lists/EmpTeacherList";
import CSS from "../emp/EmpTeacher.module.css";

function EmpTeacher() {

    const title = '강의';
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const teacher = useSelector(state => state.studyInfoReducer);
    const empCode = 1001;
   
    useEffect(() => {
        dispatch(callSelectStudyForTeacherAPI({ empCode, currentPage }));
      }, [currentPage, dispatch, empCode]);

    return(
        <>
            <TeacherNavbar />
            <Header title = { title }/>
            <div className={CSS.StuWrapper}>
                <div className={CSS.StuSearchBox}>
            <select className={CSS.StuSelect}>
                <option>전체</option>
                <option>강의 명</option>
            </select>

            <input type="text" id="search" placeholder="검색어를 입력하세요"/>
            <button className={CSS.StuSearchBtn}>
            <img src="/images/search.png" alt="검색" />
            </button>
            </div>
            <div>
            {teacher && <EmpTeacherList key={teacher.empCode} teacher={teacher} />}
            </div>
            <div className = {CSS.StuPaging}>
            {teacher.pageInfo && <PagingBar pageInfo = {teacher.pageInfo} setCurrentPage={setCurrentPage}/>}
            </div>
            </div> 
        
        </>
    );
}

export default EmpTeacher;