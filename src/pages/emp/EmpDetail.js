import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import CSS from "./EmpDetail.module.css";
import Header from "../../component/common/Header";
import { callEmpDetailAPI,callEmpDelAPI } from '../../apis/EmpAPICalls';
import EmpRecordModal from './../../component/modal/EmpRecordModal';
import EmpDeptModal from '../../component/modal/EmpDeptModal';
import EmpJobModal from '../../component/modal/EmpJobModal';
import Swal from "sweetalert2";

function EmpDetail() {

    const title = "구성원";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { empDetail } = useSelector(state => state.empReducer);
    const { result } = useSelector(state => state.empReducer);
    const params = useParams();
    const empCode = params.empCode;
    const [empRecordModal, setEmpRecordModal] = useState(false);
    const [empDeptModal, setEmpDeptModal] = useState(false);
    const [empJobModal, setEmpJobModal] = useState(false);

    useEffect(
        () => {
            dispatch(callEmpDetailAPI({ empCode }));
        },
        []
    );

    useEffect(
        () => {
            if (result?.status === 200)
                dispatch(callEmpDetailAPI({ empCode }));
        },
        [result]
    );

    const onClickRecordHandler = () => {
        setEmpRecordModal(true);
    }

    const onClickDeptHandler = () => {
        setEmpDeptModal(true);
    }

    const onClickJobHandler = () => {
        setEmpJobModal(true);
    }

    const onClickEmpDel = () => {
    Swal.fire({
        text: '구성원을 삭제하시겠습니까?',
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
            dispatch(callEmpDelAPI({ empCode }))
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
                navigate('/emp');
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

    }


    return (
        <>
            <Header title={title} />
            <div className={CSS.mypageWrapper}>
                {empDetail &&
                    <>
                        <div className={CSS.profContainer}>
                            <div id={CSS.prof} className={`${CSS[`deptCode-${empDetail.dept.deptCode}`]}`}>{empDetail.empName.slice(-2)}</div>
                            <ul className={CSS.info}>


                                <li className={CSS.name}>{empDetail.empName}</li>
                                <li>
                                    <ul style={{ display: 'flex' }}>
                                        <li className={CSS.dept}>부서</li>
                                        <li className={CSS.deptinfo}>{empDetail.dept.deptName}</li>
                                    </ul>
                                </li>
                                <li>
                                    <ul style={{ display: 'flex' }}>
                                        <li className={CSS.job}>직책</li>
                                        <li className={CSS.jobinfo}>{empDetail.job.jobName}</li>
                                    </ul>
                                </li>
                                <li className={CSS.state}>
                                    <span className={empDetail.empState === '재직중' ? CSS.empOn : CSS.empRest}>● </span>
                                    {empDetail.empState}
                                </li>


                            </ul>
                        </div>
                        <div className={CSS.privacyContainer}>
                            <div className={CSS.privacy}>개인 정보</div>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.phone}>전화번호</li>
                                <li className={CSS.phoneinfo}>{empDetail.empPhone}</li>
                            </ul>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.email}>이메일</li>
                                <li className={CSS.emailinfo}>{empDetail.empEmail}</li>
                            </ul>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.gender}>성별</li>
                                <li className={CSS.genderinfo}>{empDetail.empGender}</li>
                            </ul>
                        </div>
                        <div className={CSS.hrContainer}>
                            <div className={CSS.TitBtnWrap}>
                                <div className={CSS.privacyTit}>인사 정보</div>
                                <button
                                    className={CSS.recordBtn}
                                    onClick={onClickRecordHandler}
                                >
                                    인사이력
                                </button>
                            </div>

                            {empRecordModal && <EmpRecordModal empCode={empCode} setEmpRecordModal={setEmpRecordModal} />}


                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.phone}>사번</li>
                                <li className={CSS.phoneinfo}>{empCode}</li>
                            </ul>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.email}>부서</li>
                                <li className={CSS.emailinfo}> {empDetail.dept.deptName}</li>
                                <button
                                    className={CSS.deptBtn}
                                    onClick={onClickDeptHandler}
                                >
                                    부서이동
                                </button>
                            </ul>

                            {empDeptModal && <EmpDeptModal empCode={empCode} setEmpDeptModal={setEmpDeptModal} />}

                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.email}>직책</li>
                                <li className={CSS.emailinfo}> {empDetail.job.jobName}</li>
                                <button
                                    className={CSS.jobBtn}
                                    onClick={onClickJobHandler}
                                >
                                    직책변경
                                </button>
                            </ul>

                            {empJobModal && <EmpJobModal empCode={empCode} setEmpJobModal={setEmpJobModal} />}

                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.email}>입사일</li>
                                <li className={`${CSS.emailinfo} ${CSS.emilinfodetail}`}>{empDetail.hireDate}</li>
                            </ul>
                        </div>

                        <div className={CSS.btnWrap}>
                            <button className={CSS.pwdBtn}
                                onClick={onClickEmpDel}
                            >
                                삭제하기
                            </button>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default EmpDetail