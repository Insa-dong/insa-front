import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CSS from "./EvaRegistModal.module.css";
import { callEvaRegistAPI } from "../../apis/EvaAPICalls";
import { useState } from "react";

function EvaRegistModal({ stuCode, setEvaRegistModal }) {

    const [form, setForm] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('EV_stuCode : ', stuCode);

    const onClickHandler = () => {
        setEvaRegistModal(false);
    };

    useEffect(
        () => {

        },
        []
    );

    const onClickRegist = () => {
        dispatch(callEvaRegistAPI({...form, stuCode}));
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
                    <div clasName={CSS.title}>
                        <h1>평가 등록</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>평가</th>
                                    <td>
                                        <input
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