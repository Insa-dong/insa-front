import CSS from "./AdviceReviewModal.module.css";

function AdviceReviewModal({ adviceReview, setAdviceReviewModal }) {
  const onClickHandler = () => {
    setAdviceReviewModal(false);
  };

  return (
    <div className={CSS.modal}>
      <div className={CSS.modalContainer}>
        <div className={CSS.close} onClick={onClickHandler}>
          X
        </div>
        <div className={CSS.adviceReviewModalDiv}>
          <div className={CSS.title}>
            <h1>💌 상담일지</h1>
          </div>
          <div className={CSS.evaContent}>
            <p>💡 상담 내용</p>
            <textarea
              placeholder="상담 일지 본문"
              name="adviceLogContent"
              readOnly={true}
              value={adviceReview.adviceLogContent || ""}
            ></textarea>
          </div>
        </div>
        {adviceReview.adviceLogUpdate && ( 
            <div className={CSS.evaUpdate1}>
              <p>💾 수정일</p>
              <input
                type="Date"
                name="adviceLogUpdate"
                readOnly={true}
                value={adviceReview.adviceLogUpdate || ""}
              />
            </div>
          )}
      </div>
    </div>
  );
}

export default AdviceReviewModal;
