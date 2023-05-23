import { useNavigate } from 'react-router-dom';

function EmpTeacherItem({ item, studyCode }) {

    const navigate = useNavigate();

    const onClickStudentListHandler = () => {
        
        navigate(`/empteacher/${studyCode}`);
    };

    return(
        <tr key ={item.empCode} onClick = {onClickStudentListHandler}>
            <th>{item.study.studyCode}</th>
            <th>{item.study.training.trainingTitle}</th>
            <th>{item.studyTitle}</th>
            <th>{item.teacher.empName}</th>
        </tr>
    );
}

export default EmpTeacherItem;