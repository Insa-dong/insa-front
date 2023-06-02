import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {isAdmin} from '../../utils/TokenUtils';
import EmpModal from '../modal/EmpModal';


function EmpItem({emp}) {

	const dispatch = useDispatch();
	const [empModal, setEmpModal] = useState(false);
	const navigate = useNavigate();

	const onClickEmpHandler = (empCode) => {
		if (isAdmin().length > 0) {
			navigate(`/emp/empdetail/${empCode}`);
		} else {
			setEmpModal(true);
		}
	};

	return (
		<>
			<tr onClick = {() => onClickEmpHandler(emp.empCode)} style = {{cursor: 'pointer'}}>
				<th>{emp.empName}</th>
				<th>{emp.dept.deptName}</th>
				<th>{emp.job.jobName}</th>
			</tr>

			{empModal && <EmpModal emp = {emp} setEmpModal = {setEmpModal}/>}
		</>
	);
}

export default EmpItem;
