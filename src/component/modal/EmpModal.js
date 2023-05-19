import { useEffect, useState } from "react";
import { callModifyEmpAPI } from "../../apis/EmpAPICalls";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import './EmpModal.css';

function EmpModal({ empCode, setEmpModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setEmpModal(false);
        }
    };

    const onCloseModal = () => {
        setEmpModal(false);
    };

    return (
        <div className="Emp-modify-modal" onClick={onClickOutsideModal}>
            <div className="EmpModalContainer">
                <div className="EmpModalClose" onClick={onCloseModal}>
                    x
                </div>
                <div className="EmpModalDiv">
                    <div className="EmpModalWrap">


                        <h1 className="EmpModalTitle">구성원 정보</h1>

                        <div className="EmpPropBox">
                            <div className="EmpPropLeft"></div>
                            <div className="EmpPropRight">
                                <div className="EmpPropName">김영한</div>
                                <div>
                                    <div className="EmpPropTxtBox">
                                        <div className="EmpPropTit">부서</div>
                                        <div className="EmpPropInfo">행정</div>
                                    </div>
                                    <div className="EmpPropTxtBox">
                                        <div className="EmpPropTit">직책</div>
                                        <div className="EmpPropInfo">대표</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="EmpMyInfoBox">


                            <h2>개인 정보</h2>

                            <div>
                                <div className="EmpPropTxtBox">
                                    <div className="EmpInfoTit">휴대전화</div>
                                    <div className="EmpPropInfo">010-1234-5678</div>
                                </div>
                                <div className="EmpPropTxtBox">
                                    <div className="EmpInfoTit">이메일 </div>
                                    <div className="EmpPropInfo">hellogreedy@gmail.com</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpModal;
