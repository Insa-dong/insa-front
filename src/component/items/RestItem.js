import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './RestItem.css';

function RestItem({ rest }) {
  console.log("rest : ", rest)
  console.log("hello")
  const dispatch = useDispatch();

  let statusColor;
  switch (rest.restState) {
    case "대기":
      statusColor = "#AAAAAA";
      break;
    case "반려":
      statusColor = "#FFA9B0";
      break;
    case "승인":
      statusColor = "#8CBAFF";
      break;
    default:
      statusColor = "#AAAAAA";
      break;
  }



  return (
    <>
      <tr>
        <td>{rest.employee.dept.deptName}</td>
        <td>{rest.employee.job.jobName}</td>
        <td>{rest.employee.empName}</td>
        <td>{rest.restStart}</td>
        <td>{rest.restEnd}</td>
        <td>{rest.restMemo}</td>
        <td>
          <button className="empRestSignStatus" style={{ backgroundColor: statusColor }}>
            {rest.restState}
          </button>
        </td>
        <td>
          <button  className="empRestSignStatusApply">승인하기</button>
          <button  className="empRestSignStatusReturn">반려하기</button>
        </td>
      </tr>
    </>
  )
}

export default RestItem;