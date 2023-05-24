import React, { useEffect, useState } from 'react';
import { empDeptJobListAPI } from '../../apis/EmpAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import './EmpJobModal.css'

function EmpJobModal({ setEmpJobModal }) {

  const dispatch = useDispatch();
  const { empDeptJob } = useSelector(state => state.empReducer);

  useEffect(() => {
    dispatch(empDeptJobListAPI());
    console.log('empDeptJobListAPI 호출됨');

  }, []);

  const onClickOutsideModal = (e) => {
    if (e.target === e.currentTarget) {
      setEmpJobModal(false);
    }
  };

  const onCloseModal = () => {
    setEmpJobModal(false);
  };

  return (
    <>
      <div className="EmpJobModal" onClick={onClickOutsideModal}>
        <div className="EmpJobModalContainer">
          <div className="EmpJobModalClose" onClick={onCloseModal}>
            x
          </div>
          <div className="EmpJobModalDiv">
            <h1 className="EmpRecordModalTitle">🚀 직책변경</h1>

            <div className="EmpJobModalWrap">
              <div className="EmpJobModalDivWrap">
                <p>구분</p>
                <input
                  type="text"
                  name="offStart"
                  value="직책변경"
                  readOnly
                  placeholder="직책변경"
                />
              </div>
              <div className="EmpJobModalOption">
                <p>직책</p>
                <select
                  name="jobCode"
                // onChange={onChangeHandler}
                >
                  {empDeptJob && Array.isArray(empDeptJob.jobList) && empDeptJob.jobList.map(empDeptJob => (
                    <option key={empDeptJob.jobCode} value={empDeptJob.jobCode}>{empDeptJob.jobName}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="EmpJobModalSavebutton"
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

export default EmpJobModal