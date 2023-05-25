import './OffNowItem.css';

function OffNowItem({ off: { offCount, usedOff, remainingOff } }) {


    return (
        <table className="offNowDiv">
            <tbody>
                <tr>
                    <td>
                        <div className="div-offNow">
                            <div className="td-offNow">{offCount}</div>
                            <p className="p-offNow">총 연차</p>
                        </div>
                    </td>
                    <td>
                        <div className="div-offNow">
                            <div className="td-offNow">{usedOff}</div>
                            <p className="p-offNow">사용 연차</p>
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

export default OffNowItem;