import { useDispatch, useSelector } from "react-redux";
import CSS from "./StudyStudentRegistModal.module.css";
import { useEffect, useState } from "react";
import { callStudyStuRegistAdminAPI, callStudyStuTrainingTitleListAPI } from "../../apis/StudyStuAPICalls";
import { useNavigate } from "react-router-dom";

function StudyStudentRegistModal({ setStudyStudentRegistModal, stuCode }) {

    const [form, setForm] = useState({
        studyEnrollDate: "",
        studyState: "수강 중",
    });

    const dispatch = useDispatch();
    const { trainingList } = useSelector(state => state.studyStudentReducer);
    const { registStudyStudent } = useSelector(state => state.studyStudentReducer);
    const navigate = useNavigate();

    const onClickHandler = () => {
        setStudyStudentRegistModal(false);
    };

    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setStudyStudentRegistModal(false);
        }
    };

    useEffect(() => {
        dispatch(callStudyStuTrainingTitleListAPI());
    }, [dispatch]);

    console.log(registStudyStudent);

    useEffect(() => {
        if (registStudyStudent?.status === 200) {
            alert('강의 등록이 완료되었습니다');
            navigate('/student');
        }
    }, [registStudyStudent]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const onClickStudyStuRegistHandler = () => {
        dispatch(callStudyStuRegistAdminAPI({ ...form, stuCode }));
    };


    return (
        <div className={CSS.modal} onClick={onClickOutsideModal} >
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick={onClickHandler}>
                    X
                </div>
                <div className={CSS.adviceReviewModalDiv}>
                    <div className={CSS.title}>
                        <h1>🖥️ 과정 등록</h1>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th className={CSS.tableTh}>과정</th>
                                <td>
                                    <select className={CSS.selectBox} name="studyCode" onChange={onChangeHandler}>
                                        {trainingList && Array.isArray(trainingList) && trainingList.map((training, index) => (
                                            <option key={index} value={training.study.studyCode}>
                                                {training.studyTitle}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th className={CSS.tableTh}>수강 등록</th>
                                <td>
                                    <input
                                        type="date"
                                        name="studyEnrollDate"
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className={CSS.tableTh}>수강 상태</th>
                                <td>
                                    <select
                                        name="studyState"
                                        onChange={onChangeHandler}>
                                        <option value="수강 중">수강 중</option>
                                        <option value="수강 취소">수강 취소</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={onClickStudyStuRegistHandler}>등록하기</button>
                </div>
            </div>
        </div>
    );
}

export default StudyStudentRegistModal;