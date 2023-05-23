import './OffPastItem.css';

function OffPastItem({ off: { offDiv, offStart, offEnd, offDay, signStatus } }) {

    let imgSrc = "/images/연차신청.png";

    if (offDiv === "오전반차" || offDiv === "오후반차") {
        imgSrc = "/images/반차신청.png";
    }

    let statusColor;
    switch (signStatus) {
        case "대기":
            statusColor = "#AAAAAA";
            break;
        case "반려":
            statusColor = "#FFA9B0";
            break;
        case "승인":
            statusColor = "#8CBAFF";
            break;
    }

    return (
       
        <tr className="comingPastDiv">
            <td className="td-img">
                <img className="offDivImg" alt="offDivImg" src={imgSrc}/>
            </td>
            <td className="td-div2">{offDiv}</td>
            <td className="td-start2">{offStart}  ~ </td>
            <td className="td-end2">{offEnd}</td>
            <td className="td-day2">{offDay}일</td>
            <td className="td-signStatus2" style={{backgroundColor: statusColor}}>{signStatus}</td>
        </tr>
       
    )
}

export default OffPastItem;