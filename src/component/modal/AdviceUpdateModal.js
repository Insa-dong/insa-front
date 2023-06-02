import { useNavigate } from "react-router-dom";
import CSS from "./AdviceUpdateModal.module.css";
import { useDispatch } from "react-redux";
import { callAdviceUpdateAPI } from "../../apis/AdviceAPICalls";
import { useState } from "react";
import Swal from "sweetalert2";

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
        Swal.fire({
          text: '상담 내용을 수정하시겠습니까?',
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
            dispatch(callAdviceUpdateAPI({...form, stuCode, adviceLogCode, empCode }));
            Swal.fire({
              text: '상담 내용이 수정되었습니다.',
              icon: 'success',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'custom-success-button'
              }
            }).then(() => {
              setAdviceUpdateModal(false);
              window.location.reload();
            });
          } else {
            console.log("상담 수정이 취소되었습니다.");
          }
        });
      };

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