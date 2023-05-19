import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmpModal from '../modal/EmpModal';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAdmin } from '../../utils/TokenUtils';


function EmpItem({ emp: { empCode, empName, dept, job } }) {
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
      <tr onClick={() => onClickEmpHandler(empCode)} style={{ cursor: 'pointer' }}>
        <th>{empName}</th>
        <th>{dept.deptName}</th>
        <th>{job.jobName}</th>
      </tr>

      {/* {!isAdmin() && empModal && <EmpModal empCode={empCode} />} */}
      {empModal && <EmpModal empCode={empCode} setEmpModal={setEmpModal} />}
    </>
  );
}

export default EmpItem;
