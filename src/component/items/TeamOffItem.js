import './TeamOffItem.css';

function TeamOffItem({ off }) {


    return (
        <tr>
            <td>
                <div className="div-teamOff">
                    <div className="td-teamOff">{off.dept.deptName}</div>
                </div>
            </td>

            <td>
                <div className="div-teamOff">
                    <div className="td-teamOff">{off.job.jobName}</div>
                </div>
            </td>
            <td>
                <div className="div-teamOff">
                    <div className="td-teamOff">{off.empName}</div>
                </div>
            </td>
            <td>
                <div className="div-teamOff">
                    <div className="td-teamOff">{off.empState}</div>
                </div>
            </td>
            <td>
                <div className="div-teamOff">
                    <div className="td-teamOff">{off.offCount}</div>
                </div>
            </td>
            <td>
                <div className="div-teamOff">
                    <div className="td-teamOff">{off.usedOff}</div>
                </div>
            </td>
            <td>
                <div className="div-teamOff">
                    <div className="td-teamOff">{off.remainingOff}</div>
                </div>
            </td>
        </tr>
    )


}

export default TeamOffItem;