import { useNavigate } from "react-router-dom";
import CSS from "./AdviceUpdateModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callEvaUpdateAPI } from "../../apis/EvaAPICalls";
import { useState } from "react";

function EvaUpdateModal({ stuCode, setEvaUpdateModal, studyInfoCode, empCode, evaCode }) {

    const [form, setForm] = useState(
        {
            studyInfo:{studyInfoCode},
            student:{stuCode}
        }
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('ED_stuCode : ', stuCode);
    console.log('ED_studyInfoCode : ', studyInfoCode);
    console.log('ED_empCode : ', empCode);
    console.log('ED_evaCode : ', evaCode);

    const onBackClickHandler = () => {
        setEvaUpdateModal(false);
    };
    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSaveHandler = () => {
        dispatch(callEvaUpdateAPI({ ...form, stuCode, studyInfoCode, empCode, evaCode }));
    }

    return(
        <div className = {CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick = { onBackClickHandler }>
                    X
                </div>
                <div className={CSS.adviceReviewModalDiv}>
                    <div className={CSS.title}>
                        <h1>평가 수정</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>평가</th>
                                    <td>
                                        <input
                                            type="text"
                                            name="evaWriteContent"
                                            //value={evaUpdate.evaWriteContent}
                                            onChange={ onChangeHandler } 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>등록 일</th>
                                    <td>
                                        <input
                                            type="date"
                                            name="evaWriteDate"
                                            //value={evaUpdate.evaWirteDate}
                                            onChange={ onChangeHandler } 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>수정 일</th>
                                    <td>
                                        <input 
                                            type="date"
                                            name="evaUpdateTime"
                                            //value={evaUpdate.evaUpdateTime}
                                            onChange={ onChangeHandler } 
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick = { onSaveHandler }>수정하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EvaUpdateModal;