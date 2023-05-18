import { useEffect, useState } from "react";
import { callModifyAbsAPI } from "../../apis/AbsAPICalls";
import { useDispatch, useSelector } from "react-redux";
import './AbsModifyModal.css';

function AbsModifyModal({ abs, setAbsModifyModal }) {

    const [form, setForm] = useState(
        {
            ...abs, 
            absStart: abs.absStart ? new Date(abs.absStart) : null,
            absEnd: abs.absEnd ? new Date(abs.absEnd) : null
        });

    const dispatch = useDispatch();

    const formatTime = (date) => {
        if (date instanceof Date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        } else if (date === null) {
            return "근무 중";
        } else {
            return date;
        }
    };


    /* 입력값 변경 이벤트 */

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'absEnd' && value === '근무 중') {
            setForm((prevForm) => ({
                ...prevForm,
                absEnd: null,
            }));
        } else if (name === 'absStart') {
            setForm((prevForm) => ({
                ...prevForm,
                absStart: value,
            }));
        } else if (name === 'absEnd') {
            setForm((prevForm) => ({
                ...prevForm,
                absEnd: value,
            }));
        }
    };

    const onClickAbsModifyHandler = () => {
        console.log('onClickAbsModifyHandler called');
        if (window.confirm('수정하시겠습니까?')) {
            const absStart = form.absStart ? new Date(new Date(form.absStart).getTime() + 9 * 60 * 60 * 1000) : form.absStart;
            const absEnd = form.absEnd ? new Date(new Date(form.absEnd).getTime() + 9 * 60 * 60 * 1000) : form.absEnd;
            const modifiedForm = { ...form, absStart, absEnd };
    
            dispatch(callModifyAbsAPI(modifiedForm))
                .then(() => {
                    console.log('근태 수정 완료');
                })
                .catch((error) => {
                    console.log('근태 수정 실패:', error);
                });
        } else {
            setAbsModifyModal(false);
        }
    };

    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setAbsModifyModal(false);
        }
    };

    return (
        <div className="abs-modify-modal" onClick={onClickOutsideModal} >
            <div className="absModalContainer">
                <div className="absModalClose" onClick={() => setAbsModifyModal(false)}>
                    x
                </div>
                <div className="absModalDiv">


                    <h1 className="absModalTitle">{abs.empCode.empName}님의 근태 수정</h1>

                    <div className="absField">
                        <h1>근무일</h1>
                        <input
                            type="date"
                            name="absDate"
                            value={abs.absDate}
                            readOnly={true}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="absField">
                        <h1>부서</h1>
                        <input
                            type="text"
                            name="empCode.empName"
                            value={abs.empCode.dept.deptName}
                            readOnly={true}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="absField">
                        <h1>직급</h1>
                        <input
                            type="text"
                            name="empCode.empName"
                            value={abs.empCode.job.jobName}
                            readOnly={true}
                            onChange={onChangeHandler}
                        />
                    </div>


                    <div className="absField">
                        <h1>출근 시간</h1>
                        <input
                            type="datetime-local"
                            name="absStart"
                            value={form.absStart ? formatTime(form.absStart) : ''}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="absField">
                        <h1>퇴근 시간</h1>
                        <input
                            type="datetime-local"
                            name="absEnd"
                            value={form.absEnd ? formatTime(form.absEnd) : ''}
                            onChange={onChangeHandler}
                        />
                    </div>


                    <button onClick={onClickAbsModifyHandler}>저장</button>

                </div>
            </div>
        </div>
    );
}

export default AbsModifyModal;