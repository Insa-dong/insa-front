import React from 'react'

function EmpRecordItem({ emp }) {
    return (
        <>
            <tr>
                <td>{emp.hrUpdateDate}</td>
                <td>{emp.hrDiv}</td>
                <td>{emp.hrDiv === '부서이동' ? emp.dept.deptName : emp.job.jobName}</td>
            </tr>
        </>
    )
}

export default EmpRecordItem;