import React from 'react'
import Header from '../../component/common/Header';
import './EmpRegistration.css';
import { useNavigate } from 'react-router-dom';

function EmpRegistration() {

  const title = '구성원';
  const navigate = useNavigate();

  const onChangeHandler = (e) => {

  }

  const onClickEmpRegistrationHandler = (e) => {

  }

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
                  name="EmpName"
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
                  name="EmpEngName"
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
                  name="EmpPhone"
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
                  name="EmpEmail"
                  onChange={onChangeHandler}
                />
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
                <select
                  className="EmpRegistBox"
                  onChange={onChangeHandler}
                >
                  <option value="w">여성</option>
                  <option value="m">남성</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>부서</th>
              <td>
                <select
                  className="EmpRegistBox"
                  onChange={onChangeHandler}
                >
                  <option value="w">행정</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>직책</th>
              <td>
                <select
                  className="EmpRegistBox"
                  onChange={onChangeHandler}
                >
                  <option value="w">팀장</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>입사일</th>
              <td>
                <input className="EmpRegistBox"
                  type="date"
                  name="selectDate"
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
                onClick ={ () => navigate(-1)}
          >
                    이전으로
          </button> 
        </div>
      </div>
    </>
  )
}

export default EmpRegistration;