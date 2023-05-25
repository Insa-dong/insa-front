import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/common/Header';
import './EmpRegistration.css';
import { empDeptJobListAPI, callEmpRegistAPI } from '../../apis/EmpAPICalls';
import Swal from "sweetalert2";

function EmpRegistration() {
  const title = '구성원';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {empDeptJob} = useSelector(state => state.empReducer);
  const {empRegist} = useSelector(state => state.empReducer);
  const [form, setForm] = useState({
    empGender:"여",
    deptCode:"DE0001",
    jobCode:"JB0001"

  });

  useEffect(() => {
    dispatch(empDeptJobListAPI());
    console.log('empDeptJobListAPI 호출됨');

  }, []);

  useEffect(() => {
    if (empRegist?.status === 200) {
      navigate('/emp');
    }

  }, [empRegist]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onClickEmpRegistrationHandler = () => {
    console.log('onClickEmpRegistrationHandler called');
    Swal.fire({
        text: '구성원을 등록하시겠습니까?',
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
            dispatch(callEmpRegistAPI(form))
            .then(() => {
                Swal.fire({
                    title: '저장 완료',
                    text: '등록 사항을 확인하세요.',
                    icon: 'success',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'custom-success-button'
                    }
                });
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
};


  return (
    <>
      <Header title={title} />
      <div className="EmpRegWrap">
        <h1>구성원 등록</h1>
        <table>
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input className="EmpRegistBox"
                  type="text"
                  placeholder='이름을 입력해주세요'
                  name="empName"
                  onChange={onChangeHandler}
                />
              </td>
            </tr>
            <tr>
              <th>아이디</th>
              <td>
                <input className="EmpRegistBox"
                  type="text"
                  placeholder='아이디를 입력해주세요'
                  name="empId"
                  onChange={onChangeHandler}
                />
              </td>
            </tr>
            <tr>
              <th>휴대전화</th>
              <td>
                <input className="EmpRegistBox"
                  type="text"
                  placeholder='휴대전화 번호를 입력해주세요'
                  name="empPhone"
                  onChange={onChangeHandler}
                />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input className="EmpRegistBox"
                  type="text"
                  placeholder='이메일을 입력해주세요'
                  name="empEmail"
                  onChange={onChangeHandler}
                />
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
                <select
                  className="EmpRegistBox"
                  name="empGender"
                  onChange={onChangeHandler}
                >
                  <option value="여">여성</option>
                  <option value="남">남성</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>부서</th>
              <td>
                <select
                  className="EmpRegistBox"
                  name="deptCode"
                  onChange={onChangeHandler}
                >
                  {Array.isArray(empDeptJob.deptList) && empDeptJob.deptList.map(empDeptJob => (
                    <option key={empDeptJob.deptCode} value={empDeptJob.deptCode}>{empDeptJob.deptName}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>직책</th>
              <td>
                <select
                  className="EmpRegistBox"
                  name="jobCode"
                  onChange={onChangeHandler}
                >
                  {Array.isArray(empDeptJob.jobList) && empDeptJob.jobList.map(empDeptJob => (
                    <option key={empDeptJob.jobCode} value={empDeptJob.jobCode}>{empDeptJob.jobName}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>입사일</th>
              <td>
                <input className="EmpRegistBox"
                  type="date"
                  name="hireDate"
                  onChange={onChangeHandler}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="EmpRegistBtnWrap">
          <button className="EmpRegistEntBtn"
            onClick={onClickEmpRegistrationHandler}
          >
            등록하기
          </button>

          <button className="beforeBtn"
            onClick={() => navigate(-1)}
          >
            이전으로
          </button>
        </div>
      </div>
    </>
  )
}

export default EmpRegistration;