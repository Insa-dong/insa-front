import EmpItem from "../items/EmpItem";
import './EmpList.css'

function EmpList({ empList }) {
    return (
        <table className="EmpDiv">
            <thead>
                <tr>
                    <th>이름</th>
                    <th>부서</th>
                    <th>직책</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(empList) && empList.length > 0 ? (
                    empList.map((emp) => (
                        <EmpItem key={emp.empCode} emp={emp} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">데이터가 없습니다.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default EmpList;
