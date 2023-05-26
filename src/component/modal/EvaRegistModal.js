import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CSS from "./EvaRegistModal.module.css";
import { callEvaRegistAPI } from "../../apis/EvaAPICalls";
import { useState } from "react";

function EvaRegistModal({ stuCode, setEvaRegistModal, studyInfoCode, empCode }) {

    const [form, setForm] = useState(
        {
            studyInfo:{studyInfoCode},
            student:{stuCode}
        }
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('EV_stuCode : ', stuCode);
    console.log('EV_studyInfoCode : ', studyInfoCode);
    console.log('EV_empCode : ', empCode);

    const onClickHandler = () => {
        setEvaRegistModal(false);
    };

    useEffect(
        () => {

        },
        []
    );

    const onClickRegist = () => {
        dispatch(callEvaRegistAPI({...form, stuCode, studyInfoCode, empCode}));
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return(
        <div className={CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick={ onClickHandler }>
                    X
                </div>
                <div className={CSS.adviceReviewModalDiv}>
                    <div className={CSS.title}>
                        <h1>평가 등록</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>평가</th>
                                    <td>
                                        <textarea
                                            type="text"
                                            name="evaWriteContent"
                                            onChange={  onChangeHandler }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>등록 일</th>
                                    <td>
                                        <input
                                            type="date"
                                            name="evaWriteDate"
                                            onChange={ onChangeHandler }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick = { onClickRegist }>등록하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EvaRegistModal;