import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmpPopup from '../../pages/emp/EmpPopup';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAdmin } from '../../utils/TokenUtils';


function EmpItem({ emp: { empCode, empName, dept, job } }) {
  const dispatch = useDispatch();
  
  const [empPopup, setEmpPopup] = useState(false);
  const navigate = useNavigate();

  const onClickEmpHandler = (empCode) => {
    if (isAdmin()) {
      navigate(`/emp/empdetail/${empCode}`);
    } else {
      setEmpPopup(true);
    }
  };

  return (
    <>
      <tr onClick={() => onClickEmpHandler(empCode)} style={{ cursor: 'pointer' }}>
        <th>{empName}</th>
        <th>{dept.deptName}</th>
        <th>{job.jobName}</th>
      </tr>

      {!isAdmin() && empPopup && <EmpPopup empCode={empCode} />}
    </>
  );
}

export default EmpItem;
