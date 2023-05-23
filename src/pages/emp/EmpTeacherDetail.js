import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import TeacherNavbar from "../../component/common/TeacherNavbar";
import { callSelectStudentForStudyAPI } from "../../apis/StudyStuAPICalls";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function EmpTeacherDetail() {

    const title = '강의 별 수강생';
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState();
    const data = useSelector(state => state.studyStudentReducer);
    const { studyCode } = useParams(); 

    console.log(studyCode);

    useEffect(
        () => {
            dispatch(callSelectStudentForStudyAPI({ studyCode, currentPage }));
        },
        [currentPage, studyCode]
    );


    return(
        <>
            <TeacherNavbar />
            <Header title = {title} />
        </>
    );
}

export default EmpTeacherDetail;