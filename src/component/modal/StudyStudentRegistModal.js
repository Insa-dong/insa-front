import { useDispatch, useSelector } from "react-redux";
import CSS from "./StudyStudentRegistModal.module.css";
import { useEffect, useState } from "react";
import { callStudyStuRegistAdminAPI, callStudyStuTrainingTitleListAPI } from "../../apis/StudyStuAPICalls";

function StudyStudentRegistModal({ studyStudentRegist, setStudyStudentRegistModal }) {
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const { trainingList, loading } = useSelector(state => state.studyStudentReducer);

    const onClickHandler = () => {
        setStudyStudentRegistModal(false);
    };

    useEffect(() => {
        dispatch(callStudyStuTrainingTitleListAPI());
    }, []);

    console.log(trainingList);

    useEffect(() => {
        if (trainingList?.status === 200) {
            alert('과정 등록이 완료되었습니다');
        }
    }, [trainingList]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickStudyStuRegistHandler = () => {
        dispatch(callStudyStuRegistAdminAPI(form));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick={onClickHandler}>
                    X
                </div>
                <div className={CSS.adviceReviewModalDiv}>
                    <div className={CSS.title}>
                        <h1>과정 등록</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>과정</th>
                                    <td>
                                        <select className={CSS.selectBox} name="trainingTitle" onChange={onChangeHandler}>
                                            {trainingList && Array.isArray(trainingList) && trainingList.map((training, index) => (
                                                <option key={index} value={training}>
                                                    {training}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>회차</th>
                                    <td>
                                        <input
                                            type="number"
                                            name="trainingCount"
                                            onChange={onChangeHandler}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={onClickStudyStuRegistHandler}>등록하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudyStudentRegistModal;
