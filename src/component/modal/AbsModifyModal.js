import { useEffect, useState } from "react";
import { callModifyAbsAPI } from "../../apis/AbsAPICalls";
import { useDispatch, useSelector } from "react-redux";
import './AbsModifyModal.css';

function AbsModifyModal({ abs, setAbsModifyModal }) {

    const [form, setForm] = useState({ abs: abs });
    const dispatch = useDispatch();
    const { absModify } = useSelector((state) => state.absReducer);

    const createDate = (dateString) => {
        return dateString ? new Date(dateString) : null;
    };

    const formatTime = (date) => {
        if (date instanceof Date) {
            const localTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
            return localTime.toISOString().slice(0, 16);
        } else if (date === null) {
            return "근무 중";
        } else {
            return date;
        }
    };


    const absStart = createDate(abs.absStart);
    const absEnd = abs.absEnd ? createDate(abs.absEnd) : null;

    useEffect(() => {
        if (absModify?.status === 200) {
            setAbsModifyModal(false);
            alert("근태가 수정되었습니다.");
        }
    }, [absModify]);

    /* 입력값 변경 이벤트 */
      
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'endTime' && value === '근무 중') {
          setForm((prevForm) => ({
            ...prevForm,
            abs: {
              ...prevForm.abs,
              absEnd: null,
            },
          }));
        } else {
          setForm((prevForm) => ({
            ...prevForm,
            abs: {
              ...prevForm.abs,
              [name]: value,
            },
          }));
        }
      };
      

      const onClickAbsModifyHandler = () => {
        console.log('onClickAbsModifyHandler called');
        dispatch(callModifyAbsAPI(form)).then(() => {
            // 업데이트 후에 수행할 작업을 여기에 추가합니다.
            console.log('근태 수정 완료');
        }).catch((error) => {
            // 업데이트 실패 시 에러 처리를 여기에 추가합니다.
            console.log('근태 수정 실패:', error);
        });
    };

    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setAbsModifyModal(false);
        }
    };

    console.log(absEnd)

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
                            value={form.absDate || abs.absDate }
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
                            name="startTime"
                            value={formatTime(form.absStart) || formatTime(absStart)}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="absField">
                        <h1>퇴근 시간</h1>
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={formatTime(form.absEnd) || formatTime(absEnd)}
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