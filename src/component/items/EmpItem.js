

function EmpItem({ emp : {empCode, empName, dept, job}}) {
  return (
    <tr>
        <th>{empName}</th>
        <th>{dept.deptName}</th>
        <th>{job.jobName}</th>
    </tr>
  )
}

export default EmpItem