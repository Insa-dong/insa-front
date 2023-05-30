import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function RestItem({ rest }) {
  console.log("rest : ", rest)
  console.log("hello")
  const dispatch = useDispatch();

  return (
    <>
      <tr>
        <td>{rest.employee.dept.deptName}</td>
        <td>{rest.employee.job.jobName}</td>
        <td>{rest.employee.empName}</td>
        <td>{rest.restStart}</td>
        <td>{rest.restEnd}</td>
        <td>{rest.restMemo}</td>
        <td>{rest.restState}</td>
        <td><button>승인</button></td>
        <td><button>반려</button></td>
      </tr>
    </>
  )
}

export default RestItem;