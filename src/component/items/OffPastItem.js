
import './OffPastItem.css';

function OffPastItem({ off, onClick }) {


    let imgSrc = "/images/연차신청.png";

    if (off.offDiv === "오전반차" || off.offDiv === "오후반차") {
        imgSrc = "/images/반차신청.png";
    }

    let statusColor;
    switch (off.signStatus) {
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

    const handleClick = () => {
        onClick(off);
    }


    return (
       

            <tr className="comingPastDiv" onClick={handleClick}>
                <td className="td-img">
                    <img className="offDivImg" alt="offDivImg" src={imgSrc} />
                </td>
                <td className="td-div2">{off.offDiv}</td>
                <td className="td-start2">{off.offStart}  ~ </td>
                <td className="td-end2">{off.offEnd}</td>
                <td className="td-day2">{off.offDay}일</td>
                <td className="td-signStatus2" style={{ backgroundColor: statusColor }}>{off.signStatus}</td>
            </tr>


     
    )
}

export default OffPastItem;