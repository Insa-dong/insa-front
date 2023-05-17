import CSS from "./AdviceReviewModal.module.css";

function AdviceReviewModal({ studyList,adviceReview, setAdviceReviewModal, selectedAdvice }) {

    const onClickHandler = () => {
        setAdviceReviewModal(false);
    };

    return (
        <div className={CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.adviceReviewModalDiv}>
            <h1>상담일지</h1>

            <h1>작성자</h1>
            <input
                type="text"
                name="writer.empName"
                readOnly={true}
                value={adviceReview.writer.empName}
            />
            <textarea
                placeholder="상담 일지 본문"
                name="adviceLogContent"
                readOnly={true}
                value={adviceReview.adviceLogContent}
            ></textarea>
            <button
             style={{
                border: "none",
                margin: 0,
                fontSize: "10px",
                height: "10px",
             }}
            onClick={onClickHandler}>
                돌아가기
            </button>
        </div>
        </div>
        </div>
    );
}

export default AdviceReviewModal;
