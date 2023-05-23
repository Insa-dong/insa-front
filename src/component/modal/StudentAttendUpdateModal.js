import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CSS from "./StudentAttendUpdateModal.module.css";
import { useState } from "react";

function StudentAttendUpdateModal({ setStudentAttendUpdateModal }) {

    const [form, setForm] = useState();
    const { update } = useSelector(state => state.attendReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onBackClickHandler = () => {
        setStudentAttendUpdateModal(false);
    };
   
    return(
        <div className={CSS.modal}>
            <div className = {CSS.modalContainer}>
                <div className = {CSS.close} onClick= { onBackClickHandler }>
                    X
                </div>
                <div className = {CSS.adviceReviewModalDiv}>
                    <div className = {CSS.title}>
                        <h1>수강생 출결 수정</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>날짜</th>
                                    <input
                                        type="date"
                                        name="attendDate"
                                    />
                                </tr>
                                <tr>
                                    <th>출석</th>
                                    <select
                                        name="attendStatus">
                                        <option>선택</option>
                                        <option>출결</option>
                                        <option>결석</option>
                                        <option>지각</option>
                                        <option>조퇴</option>
                                    </select>
                                </tr>
                            </tbody>
                        </table>
                        <button>수정하기</button>
                    </div>
                </div>
                </div>
            </div>
    );
}

export default StudentAttendUpdateModal;