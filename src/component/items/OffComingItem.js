import './OffComingItem.css';

function OffComingItem({ off: { offDiv, offStart, offEnd, offDay, signStatus } }) {

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
       
        <tr className="comingOffDiv">
            <td className="td-img">
                <img className="offDivImg" alt="offDivImg" src={imgSrc}/>
            </td>
            <td className="td-div">{offDiv}</td>
            <td className="td-start">{offStart}  ~ </td>
            <td className="td-end">{offEnd}</td>
            <td className="td-day">{offDay}일</td>
            <td className="td-signStatus" style={{backgroundColor: statusColor}}>{signStatus}</td>
            <td className="td-cancel"><button className='offcancel'>신청취소</button></td>
        </tr>
       
    )
}

export default OffComingItem;