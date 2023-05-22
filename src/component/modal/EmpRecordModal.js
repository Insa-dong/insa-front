import { useEffect, useState } from 'react'
import './EmpRecordModal.css';

function EmpRecordModal({ empCode, setEmpRecordModal }) {
    console.log("hello", empCode);


    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setEmpRecordModal(false);
        }
    };

    const onCloseModal = () => {
        setEmpRecordModal(false);
    };



    return (
        <div className="Emp-modify-modal" onClick={onClickOutsideModal}>
            <div className="EmpModalContainer">
                <div className="EmpModalClose" onClick={onCloseModal}>
                    x
                </div>
                <div className="EmpModalDiv">
                    <h1 className="EmpRecordModalTitle">인사이력</h1>
                    
                </div>
            </div>
        </div>
    )
}

export default EmpRecordModal