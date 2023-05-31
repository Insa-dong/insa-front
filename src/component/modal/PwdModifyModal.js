import CSS from "./PwdModifyModal.module.css"

function PwdModifyModal({ isOpen, onClose }) {

    const handleBackgroundClick = () => {
        onClose();
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };


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
                            name="empId"
                            placeholder="현재 비밀번호"
                            autoComplete='off'
                        />
                    </div>
                    <div className={CSS.pwdContent}>새 비밀번호를 입력해주세요.</div>
                    <div className={CSS.newPwd}>
                        <input className={CSS.newPwdInput}
                            type="password"
                            name="empPwd"
                            placeholder="새 비밀번호"
                            autoComplete='off'
                        />
                    </div>
                    <div className={CSS.checkPwd}>
                        <input className={CSS.checkPwdInput}
                            type="password"
                            name="empPwd"
                            placeholder="비밀번호 확인"
                            autoComplete='off'
                        />
                    </div>

                    <button className={CSS.modifyButton}

                    >
                        비밀번호 변경
                    </button>
                </div>
            </div>
        )
    );
}

export default PwdModifyModal;