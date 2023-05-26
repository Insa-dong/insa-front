import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { callSignApplyAPI } from "../../apis/OffAPICalls";
import './OffSignModal.css';
import Swal from "sweetalert2";

function OffSignModal({ off, setOffSignModal }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signApply} = useSelector(state => state.offReducer);
    const [form, setForm] = useState({
        ...off,
        signStatus:"승인",
        returnReason: ""
    }); //초기값 설정
  
   /* useEffect(() => {
      if (signApply?.status === 200) {
        navigate('/off/adminOff/offSign');
      }
  
    }, [signApply]);*/

      const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const onClickOffApplySignHandler = async () => {
        if (form.signStatus === "반려" && form.returnReason === "") {
            Swal.fire({
              text: '반려 사유를 입력해주세요.',
              icon: 'error',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'custom-error-button'
              }
            });
            return;
          }
      Swal.fire({
        text: '해당 내용으로 처리 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'custom-confirm-button',
          cancelButton: 'custom-cancel-button',
        },
        confirmButtonColor: '#8CBAFF',
        cancelButtonColor: '#DADADA',
        confirmButtonText: '등록',
        cancelButtonText: '취소',
        reverseButtons: true,
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch(callSignApplyAPI(form, off.signCode))
            .then(() => {
                setOffSignModal(false); // 완료 확인 후 모달 닫기
                Swal.fire({
                    title: '처리 완료',
                    text: '처리 사항을 확인하세요.',
                    icon: 'success',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'custom-success-button'
                    }
                });
            })
            .catch((error) => {
                console.log(error);  // 에러 객체 확인
                Swal.fire(
                    '처리 실패',
                    '다시 시도하세요.',
                    'error'
                );
            });
        }
    });
};


    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setOffSignModal(false);
        }
    };
    return (
        <div className="OffSignModal" onClick={onClickOutsideModal}>
            <div className="OffSignModallContainer">
                <div className="OffSignModalClose" onClick={() => setOffSignModal(false)}>
                    x
                </div>
                <div className="OffSignModalDiv">
                <h1 className="OffSignModalDivTitle">연차 신청 승인</h1>
                <h1 >📌 {off.signRequester.empName}님의 연차 신청</h1>
                    
                    <h1 >📇 신청 연차 일정·사유 </h1>
                    <div className="offDiv">
                        <p>연차 종류</p>
                        <input
                            type="text"
                            name="offDiv"
                            value={off.offDiv}
                            readOnly={true}
                        />
                    </div>
                    <div className="offDay1">
                        <p>연차 시작일</p>
                        <input
                            type="text"
                            name="offStart"
                            value={off.offStart}
                            readOnly={true}
                        />
                    </div>
                    <div className="offDay2">
                        <p>연차 종료일</p>
                        <input
                            type="text"
                            name="offend"
                            value={off.offEnd}
                            readOnly={true}
                        />
                    </div>
                    <div className="offDay2">
                        <p>연차 일수</p>
                        <input
                            type="text"
                            name="offDay"
                            value={`${off.offDay}일`}
                            readOnly={true}
                        />
                    </div>
                    <p>연차 신청 사유 </p>
                    <textarea
                        className="offReasonBox"
                        placeholder="신청 사유 작성"
                        name="signReason"
                        value={off.signReason}
                        readOnly={true}
                    ></textarea>
                    <h1>📌 승인 처리</h1>
                    <select
                        className="offStatusBox"
                        name="signStatus"
                        onChange={onChangeHandler}
                    >
                        <option value="승인">승인</option>
                        <option value="반려">반려</option>
                    </select>
                    <p>반려 사유 </p>
                    <textarea
                        className="returnReasonBox"
                        placeholder="반려 시 사유 작성"
                        name="returnReason"
                        onChange={onChangeHandler}
                    ></textarea>
                    
                        <button className="offApplybutton" onClick={onClickOffApplySignHandler}>
                            등록
                        </button>
                    
                </div>
            </div>
        </div>
    )
}

export default OffSignModal;