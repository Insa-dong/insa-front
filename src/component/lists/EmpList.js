
import EmpItem from "../items/EmpItem";


function EmpList({ empList }) {

    return (
        <table className="">
            <thead className="">
                <tr>
                    <th>이름</th>
                    <th>부서</th>
                    <th>직책</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(empList) && empList.map(emp => (
                    <EmpItem key={emp.empCode} emp={emp} />
                ))}
            </tbody>
        </table>
    );
}

export default EmpList;