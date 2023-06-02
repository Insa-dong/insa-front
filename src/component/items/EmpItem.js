import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmpModal from '../modal/EmpModal';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAdmin } from '../../utils/TokenUtils';
import ProtectedRoute from './../router/ProtectedRoute';


function EmpItem({ emp }) {

  const dispatch = useDispatch();

  const [empModal, setEmpModal] = useState(false);
  const navigate = useNavigate();

  // const onClickEmpHandler = (empCode) => {
  //   // if (isAdmin()) {
  //   //   navigate(`/emp/empdetail/${empCode}`);
  //   // } else {
  //   //   setEmpModal(true);
  //   // }


  //   if (isAdmin()) {
  //     navigate(`/emp/empdetail/${empCode}`);
  //   } else {
  //     setEmpModal(true);
  //   }
  // };

  return (
    <>
<tr onClick={() => navigate(`/emp/empdetail/${emp.empCode}`)} style={{ cursor: 'pointer' }}>
        <th>{emp.empName}</th>
        <th>{emp.dept.deptName}</th>
        <th>{emp.job.jobName}</th>
      </tr>

      {empModal && <EmpModal emp={emp} />}
      {/* {empModal && <EmpModal emp={emp} setEmpModal={setEmpModal} />} */}
    </>
  );
}

export default EmpItem;
