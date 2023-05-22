import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CSS from "./EmpDetail.module.css";
import Header from "../../component/common/Header";
import { callEmpDetailAPI } from '../../apis/EmpAPICalls';
import EmpRecordModal from './../../component/modal/EmpRecordModal';
import EmpDeptModal from '../../component/modal/EmpDeptModal';
import EmpJobModal from '../../component/modal/EmpJobModal';

function EmpDetail() {

    const title = "구성원";
    const dispatch = useDispatch();
    const { empDetail } = useSelector(state => state.empReducer);
    const params = useParams();
    const empCode = params.empCode;
    const [ empRecordModal, setEmpRecordModal] = useState(false);
    const [ empDeptModal, setEmpDeptModal] = useState(false);
    const [ empJobModal, setEmpJobModal] = useState(false);
    console.log('empCode : ', empCode);
    console.log('empDetail:', { empDetail });


    useEffect(
        () => {
            dispatch(callEmpDetailAPI({ empCode }));
        },
        []
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

    return (
        <>
            <Header title={title} />
            <div className={CSS.mypageWrapper}>
                {empDetail &&
                    <>
                        <div className={CSS.profContainer}>
                            <div className={CSS.prof} />
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
                                    <span>● </span>
                                    {empDetail.empState}
                                </li>
                            </ul>
                        </div>
                        <div className={CSS.privacyContainer}>
                            <div className={CSS.privacy}>개인 정보</div>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.phone}>휴대전화</li>
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

                            {empRecordModal && <EmpRecordModal empCode={empCode} setEmpRecordModal={setEmpRecordModal}/> }


                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.phone}>사번</li>
                                <li className={CSS.phoneinfo}>{empCode}</li>
                            </ul>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.email}>부서</li>
                                <li className={CSS.emailinfo} style={{ width: '100px', marginLeft: '80px' }}>{empDetail.dept.deptName}</li>
                                <button
                                    className={CSS.deptBtn}
                                    style={{ width: '150px', marginRight: '10px', marginLeft: '1050px' }}
                                    onClick={onClickDeptHandler}
                                >
                                    부서이동
                                </button>
                            </ul>

                            {empDeptModal && <EmpJobModal empCode={empCode} setEmpJobModal={setEmpJobModal}/>}

                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.email}>직책</li>
                                <li className={CSS.emailinfo}> {empDetail.job.jobName}</li>
                                <button
                                    className={CSS.jobBtn}
                                    onClick={onClickJobHandler}
                                >
                                    직책변동
                                </button>
                            </ul>

                            {empJobModal && <EmpDeptModal empCode={empCode} setEmpDeptModal={setEmpDeptModal}/>}

                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.email}>입사일</li>
                                <li className={`${CSS.emailinfo} ${CSS.emilinfodetail}`}>{empDetail.hireDate}</li>
                            </ul>
                        </div>

                        <div className={CSS.btnWrap}>
                            <button className={CSS.pwdBtn}>비밀번호변경</button>
                            <button className={CSS.infoBtn}>개인정보변경</button>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default EmpDetail