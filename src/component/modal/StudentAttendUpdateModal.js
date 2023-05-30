import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CSS from "./StudentAttendUpdateModal.module.css";
import { useState } from "react";
import { callStudentAttendUpdateAPI } from "../../apis/AttendAPICalls";

function StudentAttendUpdateModal({ setStudentAttendUpdateModal, stuCode, attendCode, attendDetail }) {

    const selectedAttend = attendDetail && attendDetail.find((attend) => attend.attendCode === attendCode);
    const [form, setForm] = useState({
        attendDate: selectedAttend ? selectedAttend.attendDate : "",
        attendStatus: selectedAttend ? selectedAttend.attendStatus : ""
    });
    const { update } = useSelector(state => state.attendReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('updateModalStuCode :', stuCode);
    console.log('updateModalAttendCode :', attendCode);


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
        dispatch(callStudentAttendUpdateAPI({ ...form, attendCode, stuCode }));
        setStudentAttendUpdateModal(false);
        window.location.reload();
    };

    return (
        <div className={CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick={onBackClickHandler}>
                    X
                </div>
                <div className={CSS.adviceReviewModalDiv}>
                    <div className={CSS.title}>
                        <h1>수강생 출결 수정</h1>
                        <table>
                            <tbody>
                                {selectedAttend && (
                                    <>
                                        <tr key={selectedAttend.attendCode}>
                                            <th>날짜</th>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="attendDate"
                                                    value={form.attendDate || selectedAttend.attendDate}
                                                    onChange={onChangeHandler}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>출석</th>
                                            <td>
                                                <select
                                                    name="attendStatus"
                                                    value={form.attendStatus || selectedAttend.attendStatus}
                                                    onChange={onChangeHandler}>
                                                    <option>선택</option>
                                                    <option>출결</option>
                                                    <option>결석</option>
                                                    <option>지각</option>
                                                    <option>조퇴</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                        <button onClick={onUpdateHandler}>수정하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentAttendUpdateModal;