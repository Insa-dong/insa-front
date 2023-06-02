import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CSS from "./AdviceRegistModal.module.css";
import { callAdviceWriteAPI } from "../../apis/AdviceAPICalls";
import { useState } from "react";
import Swal from "sweetalert2";

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
        Swal.fire({
          text: '상담 내용을 등록하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          customClass: {
            confirmButton: 'custom-confirm-button',
            cancelButton: 'custom-cancel-button'
          },
          confirmButtonColor: '#8CBAFF',
          cancelButtonColor: '#DADADA',
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          reverseButtons: true,
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(callAdviceWriteAPI({ ...form, stuCode, empCode }));
            Swal.fire({
              text: '상담 내용이 등록되었습니다.',
              icon: 'success',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'custom-success-button'
              }
            }).then(() => {
              window.location.reload();
            });
          } else {
            console.log("상담 등록이 취소되었습니다.");
          }
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
                        <h1>📋 상담 등록</h1>
                        </div>
                        <table>
                            <tbody>
                                <tr style={{display: 'flex', flexDirection: 'column'}}>
                                    <td style={{marginLeft: '2.5vw'}}>
                                        <textarea
                                            type="text"
                                            name="adviceLogContent"
                                            onChange={  onChangeHandler }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    {/* <th>등록 일</th>
                                    <td>
                                        <input
                                            type="date"
                                            name="adviceLogDate"
                                            onChange={ onChangeHandler }
                                        />
                                    </td> */}
                                </tr>
                            </tbody>
                        </table>
                        <button onClick = { onClickAdviceRegistHandler } >등록하기</button>
                    </div>
            </div>
        </div>
    );
}

export default AdviceRegistModal;