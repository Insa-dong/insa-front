import { useNavigate } from "react-router-dom";

function StudentItem({ item }) {

    const navigate = useNavigate();

    const onClickStudentHandler = ( stuCode ) => {
        navigate(`/student/${stuCode}`);
    }

    return(
        <>
        </>
    );

}

export default StudentItem;