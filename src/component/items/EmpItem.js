import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmpModal from '../modal/EmpModal';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAdmin } from '../../utils/TokenUtils';


function EmpItem({ emp }) {

  const dispatch = useDispatch();

  const [empModal, setEmpModal] = useState(false);
  const navigate = useNavigate();

  const onClickEmpHandler = (empCode) => {
    // if (isAdmin()) {
    //   navigate(`/emp/empdetail/${empCode}`);
    // } else {
    //   setEmpModal(true);
    // }

    if (isAdmin()) {
      setEmpModal(true);
    } else {
      navigate(`/emp/empdetail/${empCode}`);
    }
  };

  return (
    <>
      <tr onClick={() => onClickEmpHandler(emp.empCode)} style={{ cursor: 'pointer' }}>
        <th>{emp.empName}</th>
        <th>{emp.dept.deptName}</th>
        <th>{emp.job.jobName}</th>
      </tr>

      {/* {!isAdmin() && empModal && <EmpModal empCode={empCode} />} */}
      {empModal && <EmpModal emp={emp} setEmpModal={setEmpModal} />}
    </>
  );
}

export default EmpItem;
