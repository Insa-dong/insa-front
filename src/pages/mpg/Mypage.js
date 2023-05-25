import { useEffect } from "react";
import Header from "../../component/common/Header";
import CSS from "./Mypage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callMypageAPI } from "../../apis/MpgAPICalls";

function Mypage() {

    const title = '내정보';
    const dispatch = useDispatch();
    const { info }  = useSelector(state => state.mypageReducer);

    useEffect(
        () => {
            dispatch(callMypageAPI());
        },
        []
    )

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
                                    // onClick={onClickJobHandler}
                                    >
                                        휴직신청
                                    </button>
                                </li>
                            </ul>
                        </ul>
                    </div>
                    <div className={CSS.privacyContainer}>
                        <div className={CSS.privacy}>개인 정보</div>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.phone}>휴대전화</li>
                            <li className={CSS.phoneinfo}>{info.empPhone}</li>
                        </ul>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.email}>이메일</li>
                            <li className={CSS.emailinfo}>{info.empEmail}</li>
                        </ul>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.gender}>성별</li>
                            <li className={CSS.genderinfo}>{info.empGender}</li>
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

                    <div className={CSS.btnWrap}>
                        <button className={CSS.pwdBtn}>비밀번호변경</button>
                        <button className={CSS.infoBtn}>개인정보변경</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Mypage;