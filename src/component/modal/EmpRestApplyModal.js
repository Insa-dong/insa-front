import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callEmpRestRegistAPI } from '../../apis/EmpAPICalls';
import './EmpRestApplyModal.css';
import Swal from 'sweetalert2';


function EmpRestApplyModal({ info, setEmpRestModal }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
       employee : {empCode : info.empCode},
        restStart: "",
        restEnd: "",
        restMemo: ""
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setEmpRestModal(false);
        }
    };

    const onCloseModal = () => {
        setEmpRestModal(false);
    };

    const onClickRestApplyHandler = async () => {
        if (
            form.restStart === "" ||
            form.restEnd === "" ||
            form.restMemo === ""
        ) {
            Swal.fire({
                text: '모든 필드를 입력해주세요.',
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'custom-error-button'
                }
            });
            return;
        }
        Swal.fire({
            text: '휴직을 신청하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button'
            },
            confirmButtonColor: '#8CBAFF',
            cancelButtonColor: '#DADADA',
            confirmButtonText: '저장',
            cancelButtonText: '취소',
            reverseButtons: true,
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(callEmpRestRegistAPI(form))
                    .then(() => {
                        Swal.fire({
                            title: '저장 완료',
                            text: '등록 사항을 확인하세요.',
                            icon: 'success',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'custom-success-button'
                            }
                        });
                        setEmpRestModal(false);
                    })
                    .catch((error) => {
                        Swal.fire(
                            '저장 실패',
                            '다시 시도하세요.',
                            'error'
                        );
                    });
            }
        });
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
                            name="restStart"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="RestDay2">
                        <p>휴직 종료일</p>
                        <input
                            type="date"
                            name="restEnd"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <p>휴직 신청 사유 </p>
                    <textarea
                        className="RestReasonBox"
                        placeholder="신청 사유 작성"
                        name="restMemo"
                        onChange={onChangeHandler}
                    ></textarea>

                    <button className="RestApplybutton"
                        onClick={onClickRestApplyHandler}
                    >
                        신청
                    </button>

                </div>
            </div>
        </div>
    )
}

export default EmpRestApplyModal