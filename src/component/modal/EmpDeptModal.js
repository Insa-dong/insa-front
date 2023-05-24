import React, { useEffect, useState } from 'react';
import { empDeptJobListAPI } from '../../apis/EmpAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import './EmpDeptModal.css';

function EmpDeptModal({ setEmpDeptModal }) {

  const dispatch = useDispatch();
  const {empDeptJob} = useSelector(state => state.empReducer);

  useEffect(() => {
    dispatch(empDeptJobListAPI());
    console.log('empDeptJobListAPI 호출됨');

  }, []);

  const onClickOutsideModal = (e) => {
    if (e.target === e.currentTarget) {
      setEmpDeptModal(false);
    }
  };

  const onCloseModal = () => {
    setEmpDeptModal(false);
  };

  return (
    <>
      <div className="EmpDeptModal" onClick={onClickOutsideModal}>
        <div className="EmpDeptModalContainer">
          <div className="EmpDeptModalClose" onClick={onCloseModal}>
            x
          </div>
          <div className="EmpDeptModalDiv">
            <h1 className="EmpRecordModalTitle">🚀 부서이동</h1>

            <div className="EmpDeptModalWrap">
              <div className="EmpDeptModalDivWrap">
                <p>구분</p>
                <input
                  type="text"
                  name="offStart"
                  value="부서이동"
                  readOnly
                  placeholder="부서이동"
                />
              </div>
              <div className="EmpDeptModalOption">
                <p>부서</p>
                <select
                  name="deptCode"
                // onChange={onChangeHandler}
                >{empDeptJob && Array.isArray(empDeptJob.deptList) && empDeptJob.deptList.map(empDeptJob => (
                  <option key={empDeptJob.deptCode} value={empDeptJob.deptCode}>{empDeptJob.deptName}</option>
                ))}
                </select>
              </div>
            </div>
            <button className="EmpDeptModalSavebutton"
            // onClick={onClickOffApplyHandler}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </>

  )
}

export default EmpDeptModal