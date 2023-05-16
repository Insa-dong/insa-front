import { useEffect, useState } from "react";
import { callAdviceWriteAPI } from "../../apis/AdviceAPICalls";
import CSS from "./AdviceReviewModal.module.css";
import { useDispatch, useSelector } from "react-redux";

function AdviceReviewWriteModal({ stuCode, setAdviceReviewWriteModal }) {

    const [form, setForm] = useState({ stuCode :  stuCode });
    const dispatch = useDispatch();
    const { adviceRegist } = useSelector((state) => state.adviceReducer);

    useEffect(() => {
        if (adviceRegist?.status === 200) {
            setAdviceReviewWriteModal(false);
            alert("상담 일지 등록이 완료 되었습니다.");
        }
    }, [adviceRegist]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickAdviceReviewHandler = () => {
        dispatch(callAdviceWriteAPI(form));
    };

    return (
        <>
        <div className={CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.adviceReviewModalDiv}>
            <h1>상담일지</h1>

            <h1>작성자</h1>
            <input
                type="text"
                name="writer.empName"
                placeholder="작성자"
                onChange={onChangeHandler}
            />
            <textarea
                placeholder="상담 일지 본문"
                name="adviceLogContent"
                onChange={onChangeHandler}
            ></textarea>
            <button onClick={onClickAdviceReviewHandler}>상담 일지 작성하기</button>
            <button onClick={() => setAdviceReviewWriteModal(false)}>
                돌아가기
            </button>
            </div>
      </div>
    </div>

        </>
    );
}

export default AdviceReviewWriteModal;
