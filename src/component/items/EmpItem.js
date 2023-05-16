

function EmpItem({ emp : {empCode, empName, deptCode, deptName, jobCode, jobName}}) {
  return (
    <tr>
        <th>{empName}</th>
        <th>{deptName}</th>
        <th>{jobName}</th>
    </tr>
  )
}

export default EmpItem