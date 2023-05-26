import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CSS from "./StudentAttendUpdateModal.module.css";
import { useState } from "react";
import { callStudentAttendUpdateAPI } from "../../apis/AttendAPICalls";

function StudentAttendUpdateModal({ setStudentAttendUpdateModal, stuCode, attendCode }) {

    const [form, setForm] = useState();
    const { update } = useSelector(state => state.attendReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    console.log('updateModalStuCode :', stuCode );
    console.log('updateModalAttendCode :', attendCode );
    

    console.log('form :', form);
    
    const onBackClickHandler = () => {
        setStudentAttendUpdateModal(false);
    };

    const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
    

    const onUpdateHandler = () => {
        dispatch(callStudentAttendUpdateAPI({...form, attendCode, stuCode}));
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
                                    <td>
                                        <input
                                            type="date"
                                            name="attendDate"
                                            onChange={ onChangeHandler }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>출석</th>
                                    <td>
                                        <select
                                            name="attendStatus"
                                            onChange={ onChangeHandler }>
                                            <option>선택</option>
                                            <option>출결</option>
                                            <option>결석</option>
                                            <option>지각</option>
                                            <option>조퇴</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={ onUpdateHandler }>수정하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentAttendUpdateModal;