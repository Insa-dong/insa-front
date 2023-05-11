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
            <img src="/images/search.png" alt="검색"/>
          </button>
          
        </div>
      </div>
    </>
  )
}

export default Emp