import React, { useEffect, useState } from 'react';
import { empDeptJobListAPI, callUpdateJobAPI } from '../../apis/EmpAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import './EmpJobModal.css'
import Swal from "sweetalert2";

function EmpJobModal({empCode, setEmpJobModal }) {

  const dispatch = useDispatch();
  const { empDeptJob } = useSelector(state => state.empReducer);

  useEffect(() => {
    dispatch(empDeptJobListAPI());

  }, []);

  const [form, setForm] = useState({
    empCode,
    job: {jobCode: "JB0001"}
  })

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      job:{[e.target.name]: e.target.value}
    })
  }

  /* 저장하기 */
  const onClickUpdateJobHandler = () => {
    Swal.fire({
      text: '직책을 변경하시겠습니까?',
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
        dispatch(callUpdateJobAPI(form))
          .then(() => {
            Swal.fire({
              title: '부서이동 완료',
              text: '변경 사항을 확인하세요.',
              icon: 'success',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'custom-success-button'
              }
            });
            setEmpJobModal(false);
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


  /* 닫기 */
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
                onChange={onChangeHandler}
                >
                  {empDeptJob && Array.isArray(empDeptJob.jobList) && empDeptJob.jobList.map(empDeptJob => (
                    <option key={empDeptJob.jobCode} value={empDeptJob.jobCode}>{empDeptJob.jobName}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="EmpJobModalSavebutton"
            onClick={onClickUpdateJobHandler}
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