import OffComingItem from "../items/OffComingItem";
import './OffComingList.css';

function OffComingList({ offComingList }) {

    return (
        <table className="offComingDiv">
            <tbody>
            {Array.isArray(offComingList) && offComingList.length > 0 ? (
                offComingList.map(off => <OffComingItem key={off.signCode} off = {off}/> )
            ) : (
                <tr>
                    <td colSpan="8"> 예정된 연차가 없습니다.</td>
                </tr>
            )}
            </tbody>
        </table>
    )
    
}

export default OffComingList;