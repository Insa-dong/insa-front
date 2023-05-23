import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import CSS from "./StudentAttendRegistModal.module.css";
import { callStudentAttendAPI, callStudnetAttendRegistAPI } from "../../apis/AttendAPICalls";

function StudentAttendRegistModal({ stuCode , studyCode, setStudentAttendRegistModal }) {

    const [form, setForm] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState();

    console.log(studyCode);
    
    const onClickHandler = () => {
        setStudentAttendRegistModal(false);
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickStudentAttendRegistHandler = () => {
        dispatch(callStudnetAttendRegistAPI({ ...form, studyCode, stuCode})); 
    };

    useEffect(
        () => {
            dispatch(callStudentAttendAPI({ currentPage }))
        },
        [currentPage]
    );

    return (
        <div className={CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick={onClickHandler}>
                    X
                </div>
                <div className={CSS.adviceReviewModalDiv}>
                    <div className={CSS.title}>
                        <h1>수강생 출결 등록</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>날짜</th>
                                    <input
                                        type="date"
                                        name="attendDate"
                                        onChange={onChangeHandler}
                                    />
                                </tr>
                                <tr>
                                    <th>출결</th>
                                    <select
                                        name="attendStatus"
                                        onChange={onChangeHandler}>
                                        <option>선택</option>
                                        <option>출결</option>
                                        <option>결석</option>
                                        <option>지각</option>
                                        <option>조퇴</option>
                                    </select>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={onClickStudentAttendRegistHandler}>등록하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentAttendRegistModal;