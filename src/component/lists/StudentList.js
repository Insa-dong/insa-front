import './StudentList.css';
import StudentItem from "../items/StudentItem";

function StudentList({ student }) {

    return(
        <table className = "tableStyle">
            <thead>
            <tr className = "trStyle">
                <th>학생 코드</th>
                <th>이름</th>
                <th>휴대폰</th>
                <th>이메일</th>
                <th>학력</th>
                <th></th>
            </tr>
            </thead>
            <tbody className ="BodyTrStyle">
                {student.data &&
                    student.data.map(item =>(
                        <StudentItem item = { item } key = {item.stuCode}/>
                    ))}
            </tbody>
        </table>
    );

}

export default StudentList;