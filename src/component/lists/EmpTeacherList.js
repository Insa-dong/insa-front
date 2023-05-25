import EmpTeacherItem from "../items/EmpTeacherItem";
import './StudentList.css';

function EmpTeacherList({ teacher }) {

console.log('teacher : ', teacher);

    return(
        <table className = "stuDiv">
            <thead className = "stuHead">
                <tr>
                    <th>강의 코드</th>
                    <th>강의 명</th>
                    <th>과정 명</th>
                    <th>강사명</th>
                </tr>
            </thead>
            <tbody>
                { teacher.data &&
                    teacher.data.map(item => (
                        <EmpTeacherItem item = { item } key = { item.empCode } studyCode={item.study.studyCode} />
                    ))}
            </tbody>
        </table>
    );
}

export default EmpTeacherList;