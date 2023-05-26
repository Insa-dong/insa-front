import MyAbsItem from "../items/MyAbsItem";
import './MyAbsList.css';

function MyAbsList({ myAbsList }) {
    return (
        <table className="absDiv">
            <thead>
                <tr>
                    <th>출근일</th>
                    <th>출근시간</th>
                    <th>퇴근시간</th>
                    <th>총 근무시간</th>
                    <th>연차 여부</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(myAbsList) && myAbsList.length > 0 ? (
                    myAbsList.map(abs => <MyAbsItem key={abs.absCode} abs={abs} />)
                ) : (
                    <tr>
                        <td colSpan="5">데이터가 없습니다.</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default MyAbsList;