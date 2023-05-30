

function TeamOffItem({ off : { job, empName, offCount, usedOff, remainingOff} }) {

    return (
        <table className="teamOffDiv">
            <tbody>
                <tr>
                <td>
                        <div className="div-teamOff">
                            <div className="td-teamOff">{job.jobName}</div>
                            <p className="p-teamOff">직책</p>
                        </div>
                    </td>
                    <td>
                        <div className="div-teamOff">
                            <div className="td-teamOff">{empName}</div>
                            <p className="p-teamOff">이름</p>
                        </div>
                    </td>
                    <td>
                        <div className="div-teamOff">
                            <div className="td-teamOff">{offCount}</div>
                            <p className="p-offteamOffNow">총 연차</p>
                        </div>
                    </td>
                    <td>
                        <div className="div-teamOff">
                            <div className="td-teamOff">{usedOff}</div>
                            <p className="p-teamOff">사용 연차</p>
                        </div>
                    </td>
                    <td>
                        <div className="div-offNow">
                            <div className="td-offNow">{remainingOff}</div>
                            <p className="p-offNow">남은 연차</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )


}

export default TeamOffItem;