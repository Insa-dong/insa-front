import { useEffect, useState } from "react";
import CSS from "./PwdModifyModal.module.css"
import { callPwdUpdateAPI } from "../../apis/MpgAPICalls";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function PwdModifyModal({ isOpen, onClose }) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({
        newPwd: "",
        checkPwd: ""
    });
    const [isCheck, setIsCheck] = useState(false);
    const [isPwdMatch, setIsPwdMatch] = useState(true);

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

        if (
            form.empPwd === "" ||
            form.newPwd === "" ||
            form.checkPwd === ""
        ) {
            Swal.fire({
                text: '모든 양식을 입력해주세요',
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'custom-error-button'
                }
            });
            return;
        }

        if (!isCheck) {
            Swal.fire({
                text: '비밀번호를 영문, 숫자를 포함한 10~18자 이내로 작성해주세요.',
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'custom-error-button'
                }
            });
            return;
        }

        if (form.newPwd !== form.checkPwd) {
            Swal.fire({
                text: '비밀번호가 일치하지 않습니다.',
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'custom-error-button'
                }
            });
            return;
        }

        Swal.fire({
            text: '변경 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button'
            },
            confirmButtonColor: '#8CBAFF',
            cancelButtonColor: '#DADADA',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            reverseButtons: true,
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                    dispatch(callPwdUpdateAPI(form));
                    Swal.fire({
                        title: '변경 완료',
                        icon: 'success',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'custom-success-button'
                        }
                    }).then(() => {
                        window.location.reload();
                    });
                } 
        });
    };


    /* 비밀번호 유효성 검사 */
    useEffect(() => {

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{10,18}$/;

        if (passwordRegex.test(form?.newPwd)) {
            setIsCheck(true);
        } else {
            setIsCheck(false);
        }

    }, [form])

    return (
        isOpen && (
            <div className={CSS.modal} onClick={handleBackgroundClick}>
                <div className={CSS.modalContainer} onClick={handleModalClick}>
                    <div className={CSS.close} onClick={onClose}>
                        X
                    </div>
                    <div className={CSS.pwdTitle}>🔒 비밀번호 변경</div>
                    <div className={CSS.pwdContent}>새 비밀번호를 입력해주세요.</div>
                    <div className={CSS.newPwd}>
                        <input className={CSS.newPwdInput}
                            type="password"
                            name="newPwd"
                            placeholder="새 비밀번호"
                            autoComplete='off'
                            onChange={onChangeHandler}
                        />
                        {!isCheck && <span className={CSS.pwdEff}>*영문, 숫자를 포함한 10~18자 이내로 작성해주세요.</span>}
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