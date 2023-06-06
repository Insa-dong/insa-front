
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { callComingupOffListAPI, callApplyAPI, callOffNowAPI } from "../../apis/OffAPICalls";
import './OffApplyModal.css';
import Swal from "sweetalert2";

function OffApplyModal({ setOffApplyModal }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { offApply } = useSelector(state => state.offReducer);
    const { offNow } = useSelector(state => state.offReducer);
    const remainingOff = offNow?.remainingOff;
    const [form, setForm] = useState({
        offDiv: "연차",
        offStart: "",
        offEnd: "",
        signReason: ""
    }); //초기값 설정

    // 리덕스 스토어에 남은 연차 정보 저장
    useEffect(() => {
        dispatch(callOffNowAPI());
    }, [dispatch]);

    useEffect(() => {
        if (offApply?.status === 200) {
            navigate('/off');
        }

    }, [offApply, navigate]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /* 연차 중복 체크 */
    const existingOffCheck = async (offStart, offEnd) => {
       
        const existingOffs = await dispatch(callComingupOffListAPI());
        const newOffStart = new Date(offStart);
        const newOffEnd = new Date(offEnd);
      
        for (let existingOff of existingOffs) {
          const existingOffStart = new Date(existingOff.offStart);
          const existingOffEnd = new Date(existingOff.offEnd);
      
          if ((newOffStart >= existingOffStart && newOffStart <= existingOffEnd) ||
              (newOffEnd >= existingOffStart && newOffEnd <= existingOffEnd) ||
              (newOffStart <= existingOffStart && newOffEnd >= existingOffEnd)) {
            return true;
          }
        }
      
        return false;
      };

    const onClickOffApplyHandler = async () => {
        if (form.offStart === "" || form.offEnd === "" || form.signReason === "") {
            Swal.fire({
                text: '모든 필드를 입력해주세요.',
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'custom-error-button'
                }
            });
            return;
        }
        if (await existingOffCheck(form.offStart, form.offEnd)) {
            Swal.fire({
              text: '이미 신청한 연차가 존재합니다.',
              icon: 'error',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'custom-error-button'
              }
            });
            return;
          }

        if (form.offStart && form.offEnd) {
            const offDays = Math.ceil((new Date(form.offEnd) - new Date(form.offStart)) / (1000 * 60 * 60 * 24)) + 1;
            if (offDays > remainingOff) {
                Swal.fire({
                    text: '남은 연차가 부족합니다.',
                    icon: 'error',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'custom-error-button'
                    }
                });
                return;
            }
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
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(callApplyAPI(form))
                        .then(() => {
                            // 신청 완료 후 offNow 상태 업데이트
                            dispatch(callOffNowAPI());
                            setOffApplyModal(false); // 완료 확인 후 모달 닫기
                            Swal.fire({
                                title: '신청 완료',
                                text: '신청 사항을 확인하세요.',
                                icon: 'success',
                                buttonsStyling: false,
                                customClass: {
                                    confirmButton: 'custom-success-button'
                                }
                            });
                        })
                        .catch((error) => {
                            Swal.fire(
                                '신청 실패',
                                '다시 시도하세요.',
                                'error'
                            );
                        });
                }
            });
        };

    }
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

                        <div className="offInfo1">연간 15개 사용 가능</div>
                        <div className="offInfo2">유급</div>
                        <div className="offInfo3">연말만료</div>
                    </div>
                    <h1 >🚥 반차정보</h1>
                    <div className="offInfoContainer">

                        <div className="offInfo1">연차 0.5개 차감</div>
                        <div className="offInfo2">오전/오후</div>
                        <div className="offInfo3">4시간</div>
                    </div>
                    {/*<h1>💡 사용 가능 연차</h1>
                    <div className="offCount">n일</div>*/}
                    <h1 className="offDivH1">📌 신청 연차 종류</h1>
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