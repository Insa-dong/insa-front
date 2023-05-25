import React, { useEffect, useState } from 'react';
import { empDeptJobListAPI, callUpdateDeptAPI } from '../../apis/EmpAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import './EmpDeptModal.css';
import Swal from "sweetalert2";

function EmpDeptModal({ empCode, setEmpDeptModal }) {

  console.log("empCode : ", empCode);


  const dispatch = useDispatch();
  const { empDeptJob } = useSelector(state => state.empReducer);
  
  useEffect(() => {
    dispatch(empDeptJobListAPI());
    console.log('empDeptJobListAPI 호출됨');
  }, []);

  const [form, setForm] = useState({
    empCode,
    dept: {deptCode: "DE0001"}
  })

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      dept:{[e.target.name]: e.target.value}
    })
  }



  /* 저장하기 */
  const onClickUpdateDeptHandler = () => {
    console.log('onClickEmpRegistrationHandler called');
    Swal.fire({
      text: '부서를 이동하시겠습니까?',
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
        dispatch(callUpdateDeptAPI(form))
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
            setEmpDeptModal(false);
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
                  // name="offStart"
                  // value="부서이동"
                  readOnly
                  placeholder="부서이동"
                />
              </div>

              <div className="EmpDeptModalOption">
                <p>부서</p>
                <select
                  name="deptCode"
                  value={form.dept.deptCode}
                  onChange={onChangeHandler}
                >{empDeptJob && Array.isArray(empDeptJob.deptList) && empDeptJob.deptList.map(empDeptJob => (
                  <option key={empDeptJob.deptCode} value={empDeptJob.deptCode}>{empDeptJob.deptName}</option>
                ))}
                </select>
              </div>

            </div>
            <button className="EmpDeptModalSavebutton"
              onClick={onClickUpdateDeptHandler}
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