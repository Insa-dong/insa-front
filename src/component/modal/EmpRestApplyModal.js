import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './EmpRestApplyModal.css';

function EmpRestApplyModal({ setEmpRestModal }) {

    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setEmpRestModal(false);
        }
    };

    const onCloseModal = () => {
        setEmpRestModal(false);
    };
    return (
        <div className="RestApplyModal" onClick={onClickOutsideModal}>
            <div className="RestApplyModalContainer">
                <div className="RestApplyModalClose" onClick={() => setEmpRestModal(false)}>
                    x
                </div>
                <div className="RestApplyModalDiv">
                    <h1 className="RestApplyModalDivTitle">💌 휴직 신청</h1>
                
                    <h1 >📇 신청 휴직 일정·사유 입력</h1>
                    <div className="RestDay1">
                        <p>휴직 시작일</p>
                        <input
                            type="date"
                            name="RestStart"
                        // onChange={onChangeHandler}
                        />
                    </div>
                    <div className="RestDay2">
                        <p>휴직 종료일</p>
                        <input
                            type="date"
                            name="RestEnd"
                        // onChange={onChangeHandler}
                        />
                    </div>
                    <p>휴직 신청 사유 </p>
                    <textarea
                        className="RestReasonBox"
                        placeholder="신청 사유 작성"
                        name="signReason"
                    // onChange={onChangeHandler}
                    ></textarea>

                    <button className="RestApplybutton"
                    // onClick={onClickRestApplyHandler}
                    >
                        신청
                    </button>

                </div>
            </div>
        </div>
    )
}

export default EmpRestApplyModal