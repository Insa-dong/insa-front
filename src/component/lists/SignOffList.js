import SignOffItem from "../items/SignOffItem";
import './SignOffList.css';
import { useState } from 'react';
import OffSignModal from '../modal/OffSignModal';

function SignOffList({ signOffList }) {

    const [offSignModal, setOffSignModal] = useState(false);
    const [selectedOff, setSelectedOff] = useState();
    const [currentPage] = useState();

    const onClickOffSignModalHandler = (off) => {
        setSelectedOff(off);
        setOffSignModal(true);
    };


    return (
        <>
            <table className="signOffListDiv">
                <thead>
                    <tr className="signOffTr">
                        <th>직책</th>
                        <th>이름</th>
                        <th>연차 종류</th>
                        <th>연차 시작일</th>
                        <th>연차 종료일</th>
                        <th>연차 일수</th>
                        <th>승인 상태</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(signOffList) && signOffList.length > 0 ? (
                        signOffList.map((off) =>
                            <SignOffItem key={off.signCode} off={off} onClick={onClickOffSignModalHandler} />)
                    ) : (
                        <tr>
                            <td colSpan="8"> 신청한 연차가 없습니다. </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {offSignModal && (
                <OffSignModal
                    off={selectedOff}
                    setOffSignModal={setOffSignModal}
                    currentPage={currentPage}
                />
            )}
        </>
    );
}

export default SignOffList;