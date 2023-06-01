import { useState } from "react";
import OffComingItem from "../items/OffComingItem";
import OffDetailModal from "../modal/OffDetailModal";
import './OffComingList.css';

function OffComingList({ offComingList }) {
    const [selectedOff, setSelectedOff] = useState();

    const onClickOffDetailModal = (off) => {
        setSelectedOff(off);
    }

    const closeOffDetailModal = () => {
        setSelectedOff();
    }

    return (
        <div>
        <table className="offComingDiv">
            <tbody>
            {Array.isArray(offComingList) && offComingList.length > 0 ? (
                offComingList.map(off => <OffComingItem key={off.signCode} off = {off} onClick={onClickOffDetailModal}/> )
            ) : (
                <tr>
                    <td colSpan="8"> 예정된 연차가 없습니다.</td>
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

export default OffComingList;