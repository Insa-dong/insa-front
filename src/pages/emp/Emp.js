import React from 'react'
import Header from '../../component/common/Header'
import './Emp.css';

function Emp() {

  const title = "구성원";
  return (
    <>
      <Header title={title} />
      <div className="EmpWrapper">

        <div className="EmpSearchBox">
          <select id="EmpSelect">
            <option value="dept">부서</option>
            <option value="job">직책</option>
          </select>

          <input type="text" id="search" placeholder="  검색어를 입력하세요" />

          <button className="EmpSearchBtn">
            <img src="/images/search.png" alt="검색" />
          </button >
        </div>

        <div className="EmpContWrapper">
          <ul className="EmpContBox">
            <li >
              <ul className="EmpContLeft">
                <li className="EmpContLeftTit">more than us</li>
                <li className="EmpContLeftSubTit">전체 구성원</li>
                <ul className="EmpContLeftDept">
                  <li>• 행정팀</li>
                  <li>• 경영지원팀</li>
                  <li>• 강사팀</li>
                  <li>• 홍보팀</li>
                  <li>• 개발팀</li>
                </ul>
              </ul>

            </li>
            <li >
              <ul className="EmpContRight">
                <li>
                  <table>
                    <tr>
                      <th>이름</th>
                      <th>부서</th>
                      <th>직책</th>
                    </tr>
                    <tr>
                      <td>이름1</td>
                      <td>부서1</td>
                      <td>직책1</td>
                    </tr>
                    <tr>
                      <td>이름2</td>
                      <td>부서2</td>
                      <td>직책2</td>
                    </tr>
                    <tr>
                      <td>이름3</td>
                      <td>부서3</td>
                      <td>직책3</td>
                    </tr>
                    <tr>
                      <td>이름4</td>
                      <td>부서4</td>
                      <td>직책4</td>
                    </tr>
                    <tr>
                      <td>이름5</td>
                      <td>부서5</td>
                      <td>직책5</td>
                    </tr>
                    <tr>
                      <td>이름6</td>
                      <td>부서6</td>
                      <td>직책6</td>
                    </tr>
                    <tr>
                      <td>이름7</td>
                      <td>부서7</td>
                      <td>직책7</td>
                    </tr>
                    <tr>
                      <td>이름8</td>
                      <td>부서8</td>
                      <td>직책8</td>
                    </tr>
                    <tr>
                      <td>이름9</td>
                      <td>부서9</td>
                      <td>직책9</td>
                    </tr>
                    <tr>
                      <td>이름10</td>
                      <td>부서10</td>
                      <td>직책10</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>
          </ul>

            <button className="EmpEntBtn" type="button">+ 구성원 등록하기</button>

            <div className="EmpPaging"></div>
        </div>

      </div>
    </>
  )
}

export default Emp