import { useState } from "react";
import OffDetailModal from "../modal/OffDetailModal";
import OffPastItem from "../items/OffPastItem";
import './OffPastList.css';

function OffPastList({ offPastList }) {
    const [selectedOff, setSelectedOff] = useState();

    const onClickOffDetailModal = (off) => {
        setSelectedOff(off);
    }

    const closeOffDetailModal = () => {
        setSelectedOff();
    }

    return (
        <div>
            <table className="offPastDiv">
                <tbody>
                {Array.isArray(offPastList) && offPastList.length > 0 ? (
                    offPastList.map(off => <OffPastItem key={off.signCode} off={off} onClick={onClickOffDetailModal} />)
                ) : (
                    <tr>
                        <td colSpan="8"> 연차 사용 기록이 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </table>
            {selectedOff && (
                <OffDetailModal off={selectedOff} setOffDetailModal={closeOffDetailModal} />
            )}
        </div>
    )
}

export default OffPastList;