import { useState } from "react";
import CSS from "./PwdModifyModal.module.css"
import { callPwdUpdateAPI } from "../../apis/MpgAPICalls";
import { useDispatch } from "react-redux";

function PwdModifyModal({ isOpen, onClose }) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({});

    const handleBackgroundClick = () => {
        onClose();
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const onChangeHandler = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      }

    const onClickPwdModifyHandler = () => {
        dispatch(callPwdUpdateAPI(form));
        window.location.reload();
    }


    return (
        isOpen && (
            <div className={CSS.modal} onClick={handleBackgroundClick}>
                <div className={CSS.modalContainer} onClick={handleModalClick}>
                    <div className={CSS.close} onClick={onClose}>
                        X
                    </div>
                    <div className={CSS.pwdTitle}>🔒 비밀번호 변경</div>
                    <div className={CSS.pwdContent}>현재 비밀번호를 입력해주세요.</div>
                    <div className={CSS.nowPwd}>
                        <input className={CSS.nowPwdInput}
                            type="password"
                            name="empPwd"
                            placeholder="현재 비밀번호"
                            autoComplete='off'
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className={CSS.pwdContent}>새 비밀번호를 입력해주세요.</div>
                    <div className={CSS.newPwd}>
                        <input className={CSS.newPwdInput}
                            type="password"
                            name="newPwd"
                            placeholder="새 비밀번호"
                            autoComplete='off'
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className={CSS.checkPwd}>
                        <input className={CSS.checkPwdInput}
                            type="password"
                            name="checkPwd"
                            placeholder="비밀번호 확인"
                            autoComplete='off'
                            onChange={onChangeHandler}
                        />
                    </div>

                    <button 
                        className={CSS.modifyButton}
                        onClick={onClickPwdModifyHandler}
                    >
                        변경하기
                    </button>
                </div>
            </div>
        )
    );
}

export default PwdModifyModal;