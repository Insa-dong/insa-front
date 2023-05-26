import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CSS from "./AdviceRegistModal.module.css";
import { callAdviceWriteAPI } from "../../apis/AdviceAPICalls";
import { useState } from "react";

function AdviceRegistModal({ stuCode, setAdviceRegistModal, empCode }) {

    const [form, setForm] = useState({
        student:{stuCode},
        writer:{empCode}
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('AR_stuCode : ', stuCode);
    console.log('AR_empCode : ', empCode); 

    const onClickHandler = () => {
        setAdviceRegistModal(false);
    };

    useEffect(
        () => {
        },
        []
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickAdviceRegistHandler = () => {
        dispatch(callAdviceWriteAPI({ ...form, stuCode, empCode }));
    };

    return(
        <div className={CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick={ onClickHandler }>
                    X
                </div>
                <div className={CSS.adviceReviewModalDiv}>
                    <div clasName={CSS.title}>
                        <h1>상담 등록</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>상담 일지</th>
                                    <td>
                                        <textarea
                                            type="text"
                                            name="adviceLogContent"
                                            onChange={  onChangeHandler }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>등록 일</th>
                                    <td>
                                        <input
                                            type="date"
                                            name="adviceLogDate"
                                            onChange={ onChangeHandler }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick = { onClickAdviceRegistHandler } >등록하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdviceRegistModal;