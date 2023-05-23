
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { callApplyAPI } from "../../apis/OffAPICalls";
import './OffApplyModal.css';

function OffApplyModal({ setOffApplyModal }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const offApply = useSelector(state => state.offReducer);
    const [form, setForm] = useState({}); //초기값으로 빈 객체 {}를 사용



      const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickOffApplyHandler = async () => {
        Swal.fire({
          text: '해당 내용으로 연차를 신청 하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          customClass: {
            confirmButton: 'custom-confirm-button',
            cancelButton: 'custom-cancel-button',
          },
          confirmButtonColor: '#8CBAFF',
          cancelButtonColor: '#DADADA',
          confirmButtonText: '신청',
          cancelButtonText: '취소',
          reverseButtons: true,
          buttonsStyling: false,
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                await dispatch(callApplyAPI({
                    offStart: form.offStart,    
                    offEnd: form.offEnd,         
                    signReason: form.signReason, 
                    offDiv: form.offDiv          
                  }));
              Swal.fire({
                title: '신청 완료',
                text: '신청 내역을 확인하세요.',
                icon: 'success',
                buttonsStyling: false,
                customClass: {
                  confirmButton: 'custom-success-button',
                },
              });
              setOffApplyModal(false); // 완료 후 모달 닫기
            } catch (error) {
                console.error('API 호출 에러:', error);
                Swal.fire({
                  title: '신청 실패',
                  text: '다시 시도하세요.',
                  icon: 'error',
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: 'custom-error-button',
                  },
                });
              }
          }
        });
      };



    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setOffApplyModal(false);
        }
    };
    return (
        <div className="OffApplyModal" onClick={onClickOutsideModal}>
            <div className="OffApplyModalContainer">
                <div className="OffApplyModalClose" onClick={() => setOffApplyModal(false)}>
                    x
                </div>
                <div className="OffApplyModalDiv">
                <h1 className="OffApplyModalDivTitle">연차 신청</h1>
                <h1 >✈️ 연차정보</h1>
                    <div className="offInfoContainer">
                       
                        <div className="offInfo1">1년당 15개 사용 가능</div>
                        <div className="offInfo2">유급</div>
                        <div className="offInfo3">연말만료</div>
                    </div>
                    <h1>💡 사용 가능 연차</h1>
                    <div className="offCount">n일</div>
                    <h1>📌 신청 연차 종류</h1>
                    <select
                        className="offDivBox"
                        name="offDiv"
                        onChange={onChangeHandler}
                    >
                        <option value="연차">연차</option>
                        <option value="오전반차">오전반차</option>
                        <option value="오후반차">오후반차</option>
                    </select>
                    <h1 >📇 신청 연차 일정·사유 입력</h1>
                    <div className="offDay1">
                        <p>연차 시작일</p>
                        <input
                            type="date"
                            name="offStart"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="offDay2">
                        <p>연차 종료일</p>
                        <input
                            type="date"
                            name="offEnd"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <p>연차 신청 사유 </p>
                    <textarea
                        className="offReasonBox"
                        placeholder="신청 사유 작성"
                        name="signReason"
                        onChange={onChangeHandler}
                    ></textarea>
                    
                        <button className="offApplybutton" onClick={onClickOffApplyHandler}>
                            신청
                        </button>
                    
                </div>
            </div>
        </div>
    )
}

export default OffApplyModal;