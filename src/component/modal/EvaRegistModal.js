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
        window.location.reload();
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
                        <h1>💌 평가 등록</h1>
                        </div>
                        <table>
                            <tbody>
                                <tr style={{display: 'flex', flexDirection: 'column'}}>
                                    <td style={{marginLeft: '2.5vw'}}>
                                        <textarea
                                            type="text"
                                            name="evaWriteContent"
                                            onChange={  onChangeHandler }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick = { onClickRegist }>등록하기</button>
                </div>
            </div>
        </div>
    );
}

export default EvaRegistModal;