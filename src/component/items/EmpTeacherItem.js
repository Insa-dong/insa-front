import { useNavigate } from 'react-router-dom';

function EmpTeacherItem({ item, studyCode }) {

    const navigate = useNavigate();

    const onClickStudentListHandler = () => {
        
        navigate(`/empteacher/${studyCode}`);
    };

    return(
        <tr key ={item.empCode}>
            <th onClick = {onClickStudentListHandler}>{item.study.studyCode}</th>
            <th onClick = {onClickStudentListHandler}>{item.study.training.trainingTitle}</th>
            <th onClick = {onClickStudentListHandler}>{item.studyTitle}</th>
            <th onClick = {onClickStudentListHandler}>{item.teacher.empName}</th>
        </tr>
    );
}

export default EmpTeacherItem;