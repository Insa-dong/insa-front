import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CSS from "../mpg/Mypage.module.css";
import Header from "../../component/common/Header";
import {callEmpListAPI} from '../../apis/EmpAPICalls';

function EmpDetail() {

  const title = "구성원";

  
  return (
    <>
            <Header title={title} />
            <div className={CSS.mypageWrapper}>
                <div className={CSS.profContainer}>
                    <div className={CSS.prof} />
                    <ul className={CSS.info}>


                        <li className={CSS.name}>김영한</li>
                        <li>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.dept}>부서</li>
                                <li className={CSS.deptinfo}>행정팀</li>
                            </ul>
                        </li>
                        <li>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.job}>직책</li>
                                <li className={CSS.jobinfo}>관리자</li>
                            </ul>
                        </li>
                        <li className={CSS.state}>
                            <span>● </span>
                            재직중
                        </li>
                    </ul>
                </div>
                <div className={CSS.privacyContainer}>
                    <div className={CSS.privacy}>개인 정보</div>
                    <ul style={{ display: 'flex' }}>
                        <li className={CSS.phone}>휴대전화</li>
                        <li className={CSS.phoneinfo}>010-1234-5678</li>
                    </ul>
                    <ul style={{ display: 'flex' }}>
                        <li className={CSS.email}>이메일</li>
                        <li className={CSS.emailinfo}>gildong@gmail.com</li>
                    </ul>
                    <ul style={{ display: 'flex' }}>
                        <li className={CSS.gender}>성별</li>
                        <li className={CSS.genderinfo}>여</li>
                    </ul>
                </div>
                <div className={CSS.hrContainer}>
                  <div className={CSS.TitBtnWrap}>
                    <div className={CSS.privacyTit}>인사 정보</div>
                    <button className={CSS.recordBtn}>인사이력</button>
                  </div>

                    <ul style={{ display: 'flex' }}>
                        <li className={CSS.phone}>사번</li>
                        <li className={CSS.phoneinfo}>TE0001</li>
                    </ul>
                    <ul style={{ display: 'flex' }}>
                        <li className={CSS.email}>부서</li>
                        <li className={CSS.emailinfo}>강사</li>
                        <button className={CSS.deptBtn}>부서이동</button>
                    </ul>
                    <ul style={{ display: 'flex' }}>
                        <li className={CSS.email}>직책</li>
                        <li className={CSS.emailinfo}> 강사</li>
                        <button className={CSS.jobBtn}>직책변동</button>
                    </ul>
                    <ul style={{ display: 'flex' }}>
                        <li className={CSS.email}>입사일</li>
                        <li className={`${CSS.emailinfo} ${CSS.emilinfodetail}`}>2020.05.31</li>
                    </ul>
                </div>

                <div className={CSS.btnWrap}>
                    <button className={CSS.pwdBtn}>비밀번호변경</button>
                    <button className={CSS.infoBtn}>개인정보변경</button>
                </div>
            </div>
        </>
  )
}

export default EmpDetail