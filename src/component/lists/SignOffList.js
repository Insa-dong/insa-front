import SignOffItem from "../items/SignOffItem";
import './SignOffList.css';

function SignOffList({ signOffList }) {
    return (
        <table className="signOffDiv">
            <thead>
                <tr className="signOffTr">
                    <th>직급명</th>
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
                    signOffList.map((off) => <SignOffItem key={off.signCode} off={off} />)
                ) : (
                    <tr>
                        <td colSpan="8"> 신청한 연차가 없습니다. </td>
                    </tr>
                )}
            </tbody>
        </table>

    );
}

export default SignOffList;