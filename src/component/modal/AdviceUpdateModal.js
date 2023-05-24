import { useNavigate } from "react-router-dom";
import CSS from "./AdviceUpdateModal.module.css";
import { useDispatch } from "react-redux";
import { callAdviceUpdateAPI } from "../../apis/AdviceAPICalls";
import { useState } from "react";

function AdviceUpdateModal({ adviceUpdate, setAdviceUpdateModal, stuCode }) {

    const [form, setForm] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('AU_stuCode : ', stuCode);
    
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
        dispatch(callAdviceUpdateAPI({...form, stuCode}));
    }

    return(
        <div className = {CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick = { onBackClickHandler }>
                    X
                </div>
                <div className={CSS.adviceReviewModalDiv}>
                    <div className={CSS.title}>
                        <h1>상담 일지 수정</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>상담 일지</th>
                                    <td>
                                        <input
                                            type="text"
                                            name="adviceLogContent"
                                            onChange = { onChangeHandler }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>등록 일</th>
                                    <td>
                                        <input
                                            type="date"
                                            name="adviceLogDate"
                                            onChange = { onChangeHandler }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>수정 일</th>
                                    <td>
                                        <input 
                                            type="date"
                                            name="adviceLogDate"
                                            onChange = { onChangeHandler }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick = {onSaveHandler}>수정하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdviceUpdateModal;