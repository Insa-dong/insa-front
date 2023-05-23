import React from 'react'
import './EmpJobModal.css'

function EmpJobModal({ setEmpJobModal }) {

  const onClickOutsideModal = (e) => {
    if (e.target === e.currentTarget) {
      setEmpJobModal(false);
    }
  };

  const onCloseModal = () => {
    setEmpJobModal(false);
  };

  return (
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
              <p>부서</p>
              <select
                name="jobCode"
              // onChange={onChangeHandler}
              >
                <option>대표</option>
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
  )
}

export default EmpJobModal