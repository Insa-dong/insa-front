import './OffComingItem.css';

function OffComingItem({ off: { offDiv, offStart, offEnd, offDay, signStatus } }) {

    let imgSrc = "/images/연차신청.png";

    if (offDiv === "오전반차" || offDiv === "오후반차") {
        imgSrc = "/images/반차신청.png";
    }

    return (
        <tr>
            <td>
                <img className="offDivImg" alt="offDivImg" src={imgSrc}/>
            </td>
            <td>{offDiv}</td>
            <td>{offStart}</td>
            <td>{offEnd}</td>
            <td>{offDay}</td>
            <td>{signStatus}</td>
            <td><button>신청취소</button></td>
        </tr>
    )
}

export default OffComingItem;