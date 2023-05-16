import { useEffect, useState } from "react";
import { callModifyAbsAPI } from "../../apis/AbsAPICalls";
import { useDispatch, useSelector } from "react-redux";
import './AbsModifyModal.css';

function AbsModifyModal({ abs, setAbsModifyModal }) {

    const [form, setForm] = useState({ abs: abs });
    const dispatch = useDispatch();
    const { absModify } = useSelector((state) => state.absReducer);
    const createDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? null : date;
      };
    
      const formatTime = (date) => {
        if (date instanceof Date) {
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
    
          return `${hours}:${minutes}:${seconds}`;
        } else {
          return "근무 중"; // endTime이 없을 경우
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
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const onClickAbsModifyHandler = () => {
        dispatch(callModifyAbsAPI(form));
    };

    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
          setAbsModifyModal(false);
        }
      };

    return (
        <div className="abs-modify-modal" onClick={onClickOutsideModal} >
         <div className="absModalContainer">
            <div className="absModalDiv">
            <h1>근무일</h1>
            <input
                type="date"
                name="absDate"
                value={abs.absDate}
                onChange={onChangeHandler}
            />
            <h1>사원명</h1>
            <input
                type="text"
                name="empCode.empName"
                value={abs.empCode.empName}
                onChange={onChangeHandler}
            />
            <h1>출근 시간</h1>
            <input
                type="tdatetime-local"
                name="startTime"
                value={formatTime(abs.absStart)}
                onChange={onChangeHandler}
            />
            <h1>퇴근 시간</h1>
            <input
                type="datetime-local"
                name="endTime"
                value={formatTime(abs.absEnd)}
                onChange={onChangeHandler}
            />


            <button onClick={onClickAbsModifyHandler}>저장</button>
            <button onClick={() => setAbsModifyModal(false)}>
                취소
            </button>
            </div>
            </div>
        </div>
    );
}

export default AbsModifyModal;