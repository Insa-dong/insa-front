import { useNavigate } from "react-router-dom";
import CSS from "./AdviceUpdateModal.module.css";
import { useDispatch } from "react-redux";
import { callAdviceUpdateAPI } from "../../apis/AdviceAPICalls";
import { useState } from "react";

function AdviceUpdateModal({ setAdviceUpdateModal, stuCode , adviceLogCode, empCode, adviceList }) {

    const selectedAdvice = adviceList && adviceList.find((advice) => advice.adviceLogCode === adviceLogCode);
    const [form, setForm] = useState(
        {
            student:{stuCode},
            writer:{empCode},
            adviceLogContent: selectedAdvice ? selectedAdvice.adviceLogContent : "",
            adviceLogDate: selectedAdvice ? selectedAdvice.adviceLogDate : "",
            adviceLogUpdate: selectedAdvice ? selectedAdvice.adviceLogUpdate : ""
        }
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('AU_stuCode : ', stuCode);
    console.log('AU_adviceLogCode : ', adviceLogCode);
    console.log('AU_empCode :', empCode);
    
    const onBackClickHandler = () => {
        setAdviceUpdateModal(false);
    };

    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSaveHandler = () => {
        dispatch(callAdviceUpdateAPI({...form, stuCode, adviceLogCode , empCode }));
        setAdviceUpdateModal(false);
        window.location.reload();
    }

    return(
        <div className = {CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick = { onBackClickHandler }>
                    X
                </div>
                <div className={CSS.adviceReviewModalDiv}>
                    <div className={CSS.title}>
                        <h1>💌 상담 일지 수정</h1>
                        </div>
                        <table>
                            <tbody>
                            {selectedAdvice && (
                                <>
                                <tr style={{display: 'flex', flexDirection: 'column'}}>
                                    <td style={{marginLeft: '2.5vw'}}>
                                        <textarea
                                            type="text"
                                            name="adviceLogContent"
                                            value={form.adviceLogContent || selectedAdvice.adviceLogContent}
                                            onChange = { onChangeHandler }
                                        />
                                    </td>
                                </tr>
                                </>
                                )}
                            </tbody>
                        </table>
                        <button onClick = {onSaveHandler}>수정하기</button>
                </div>
            </div>
        </div>
    );
}

export default AdviceUpdateModal;