import OffPastItem from "../items/OffPastItem";
import './OffPastList.css';

function OffPastList({ offPastList }) {

    return (
        <table className="offPastDiv">
            <tbody>
            {Array.isArray(offPastList) && offPastList.length > 0 ? (
                offPastList.map(off => <OffPastItem key={off.signCode} off = {off}/> )
            ) : (
                <tr>
                    <td colSpan="8"> 연차 사용 기록이 없습니다.</td>
                </tr>
            )}
            </tbody>
        </table>
    )
    
}

export default OffPastList;