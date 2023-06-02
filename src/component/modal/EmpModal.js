import './EmpModal.css';
import CSS from "../../pages/emp/EmpDetail.module.css";

function EmpModal({emp, setEmpModal }) {

    console.log(emp);

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
                            <div id="EmpPropLeft" className={`${CSS[`deptCode-${emp.dept.deptCode}`]}`}>{emp.empName.slice(-2)}</div>
                            <div className="EmpPropRight">
                                <div className="EmpPropName">{emp.empName}</div>
                                <div>
                                    <div className="EmpPropTxtBox">
                                        <div className="EmpPropTit">부서</div>
                                        <div className="EmpPropInfo">{emp.dept.deptName}</div>
                                    </div>
                                    <div className="EmpPropTxtBox">
                                        <div className="EmpPropTit">직책</div>
                                        <div className="EmpPropInfo">{emp.job.jobName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="EmpMyInfoBox">


                            <h2>개인 정보</h2>

                            <div>
                                <div className="EmpPropTxtBox">
                                    <div className="EmpInfoTit">휴대전화</div>
                                    <div className="EmpPropInfo">{emp.empPhone}</div>
                                </div>
                                <div className="EmpPropTxtBox">
                                    <div className="EmpInfoTit">이메일 </div>
                                    <div className="EmpPropInfo">{emp.empEmail}</div>
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
