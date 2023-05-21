
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { callApplyAPI } from "../../apis/OffAPICalls";
import './OffApplyModal.css';

function OffApplyModal({ setOffApplyModal }) {

    const [form, setForm] = useState({});

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickOffApplyHandler = () => {
        dispatch(callApplyAPI(form));
    };

    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setOffApplyModal(false);
        }
    };

    return (
        <div className="OffApplyModal" onClick={onClickOutsideModal}>
            <div className="OffApplyModalContainer">
                <div className="OffApplyModalClose" onClick={() => setOffApplyModal(false)}>
                    x
                </div>
                <div className="OffApplyModalDiv">
                <h1 >✈️ 연차정보</h1>
                    <div className="offInfoContainer">
                       
                        <div className="offInfo1">1년당 15개 사용 가능</div>
                        <div className="offInfo2">유급</div>
                        <div className="offInfo3">연말만료</div>
                    </div>
                    <h1>💡 사용 가능 연차</h1>
                    <div className="offCount">n일</div>
                    <h1>📌 연차 종류</h1>
                    <select
                        className="offDivBox"
                        name="offDiv"
                        onChange={onChangeHandler}
                    >
                        <option value="연차">연차</option>
                        <option value="오전반차">오전반차</option>
                        <option value="오후반차">오후반차</option>
                    </select>
                    <h1 >📇 휴가 일정·신청 사유 입력</h1>
                    <div className="offDay1">
                        <p>연차 시작일</p>
                        <input
                            type="date"
                            name="offStart"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="offDay2">
                        <p>연차 종료일</p>
                        <input
                            type="date"
                            name="offEnd"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <p>연차 신청 사유 </p>
                    <textarea
                        className="offReasonBox"
                        placeholder="신청 사유 작성"
                        name="offReason"
                        onChange={onChangeHandler}
                    ></textarea>
                    
                        <button className="offApplybutton" onClick={onClickOffApplyHandler}>
                            신청
                        </button>
                    
                </div>
            </div>
        </div>
    )
}

export default OffApplyModal;