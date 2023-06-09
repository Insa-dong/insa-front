import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../../component/common/Header";
import CSS from "./Mypage.module.css";
import { callMypageAPI, callPrivacyUpdateAPI } from "../../apis/MpgAPICalls";
import EmpRestApplyModal from "../../component/modal/EmpRestApplyModal";
import Swal from "sweetalert2";
import PwdModifyModal from '../../component/modal/PwdModifyModal';

function Mypage() {

    const title = '내정보';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { info } = useSelector(state => state.mypageReducer);
    const [empRestApplyModal, setEmpRestModal] = useState(false);
    const [form, setForm] = useState({...info});
    const [errors, setErrors] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({ ...info });
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        validateForm();
    }

    const onClickModifyHandler = () =>{
        Swal.fire({
            text: '수정 하시겠습니까?',
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
                dispatch(callPrivacyUpdateAPI(form));
                Swal.fire({
                    title: '수정 완료',
                    icon: 'success',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'custom-success-button'
                    }
                })
                    .then(() => {
                        window.location.reload();
                    })
            }
        });
    }



    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onClickRestHandler = () => {
        setEmpRestModal(true);
    }

    const validateForm = () => {
        const newErrors = {};
    
        if (!form.empPhone) {
            // newErrors.empPhone = '전화번호를 입력해주세요.';
        } else if (!/^\d{2,3}-\d{3,4}-\d{3,4}$/.test(form.empPhone)) {
          newErrors.empPhone = '*전화번호 형식에 맞게 입력해주세요.';
        } else {
          newErrors.empPhone = ''; // 유효한 경우 오류 메시지를 빈 문자열로 업데이트
        }
    
        if (!form.empEmail) {
            // newErrors.empEmail = '이메일을 입력해주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.empEmail)) {
            newErrors.empEmail = '*유효한 이메일 주소를 입력해주세요.';
        } else {
          newErrors.empEmail = ''; // 유효한 경우 오류 메시지를 빈 문자열로 업데이트
        }
    
        setErrors(newErrors);
        
        // return Object.keys(newErrors).length === 0;
    };

    useEffect(
        () => {
            dispatch(callMypageAPI());
        },
        []
    );

    


    return (
        <>
            <Header title={title} />
            {info && (
                <div className={CSS.mypageWrapper} key={info.empCode}>
                    <div className={CSS.profContainer}>
                        <div id={CSS.prof} className={`${CSS[`deptCode-${info.dept.deptCode}`]}`}>{info.empName.slice(-2)}</div>
                        <ul className={CSS.info}>
                            <li className={CSS.name}>{info.empName}</li>
                            <li>
                                <ul style={{ display: 'flex' }}>
                                    <li className={CSS.dept}>부서</li>
                                    <li className={CSS.deptinfo}>{info.dept.deptName}팀</li>
                                </ul>
                            </li>
                            <li>
                                <ul style={{ display: 'flex' }}>
                                    <li className={CSS.job}>직책</li>
                                    <li className={CSS.jobinfo}>{info.job.jobName}</li>
                                </ul>
                            </li>
                            <ul className={CSS.restWrap}>
                                <li className={CSS.state}>
                                    <span>● </span> 재직중
                                </li>
                                <li>
                                    <button
                                        className={CSS.restBtn}
                                        onClick={onClickRestHandler}
                                    >
                                        휴직신청
                                    </button>
                                </li>
                            </ul>

                            {empRestApplyModal && <EmpRestApplyModal info={info} setEmpRestModal={setEmpRestModal} />}
                        </ul>
                    </div>
                    <div className={CSS.privacyContainer}>
                        <div className={CSS.privacy}>개인 정보</div>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.phone}>휴대전화</li>
                            <input
                                name="empPhone"
                                placeholder='휴대전화'
                                className={!modifyMode ? CSS.phoneinfo : CSS.phoneinfoModify}
                                value={!modifyMode ? info.empPhone : form.empPhone}
                                readOnly={!modifyMode}
                                autoComplete='off'
                                onChange={onChangeHandler}
                            />
                            {errors.empPhone && <span className="error">{errors.empPhone}</span>}
                        </ul>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.email}>이메일</li>
                            <input
                                name="empEmail"
                                placeholder='이메일'
                                className={!modifyMode ? CSS.emailinfo : CSS.emailinfoModify}
                                value={!modifyMode ? info.empEmail : form.empEmail}
                                readOnly={!modifyMode}
                                autoComplete='off'
                                onChange={onChangeHandler}
                            />
                             {errors.empEmail && <span className="error">{errors.empEmail}</span>}
                        </ul>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.gender}>성별</li>
                            {!modifyMode &&
                                <li className={CSS.genderinfo}>{info.empGender}</li>

                            }
                            {modifyMode &&
                                <select
                                    className={CSS.selectGender}
                                    name="empGender"
                                    onChange={onChangeHandler}
                                >
                                    <option value="">변경없음</option>
                                    <option value="여">여성</option>
                                    <option value="남">남성</option>
                                </select>

                            }
                        </ul>
                    </div>
                    <div className={CSS.hrContainer}>
                        <div className={`${CSS.privacyTit} ${CSS.recordTit}`}>인사 정보</div>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.phone}>사번</li>
                            <li className={CSS.phoneinfo}>{info.empCode}</li>
                        </ul>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.email}>부서</li>
                            <li className={CSS.emailinfo}>{info.dept.deptName}팀</li>
                        </ul>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.email}>직책</li>
                            <li className={CSS.emailinfo}>{info.job.jobName}</li>
                        </ul>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.email}>입사일</li>
                            <li className={CSS.emailinfo}>{info.hireDate}</li>
                        </ul>
                    </div>
                    {!modifyMode &&
                        <div className={CSS.btnWrap}>
                            <button className={CSS.pwdBtn} onClick={() => openModal()}>비밀번호변경</button>
                            <button className={CSS.infoBtn} onClick={onClickModifyModeHandler}>개인정보변경</button>
                        </div>
                    }

                    {modifyMode &&
                        <div className={CSS.btnWrap}>
                            <button className={CSS.pwdBtn}  onClick={onClickModifyHandler}>수정하기</button>
                            <button className={CSS.infoBtn} onClick={() => { setModifyMode(false) }}>수정취소</button>
                        </div>
                    }
                    <PwdModifyModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            )}
        </>
    );
}

export default Mypage;