import { useEffect } from "react";
import { useSelector } from "react-redux";

function EmpTeacherDetailPlus() {

    const { data } = useSelector(state => state.studyStudentReducer);

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <td>이름</td>
                    </tr>
                    <tr>
                        <td>영문이름</td>
                    </tr>
                    <tr>
                        <td>생년월일</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default EmpTeacherDetailPlus;