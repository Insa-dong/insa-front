import CSS from "./EvaReviewCheckModal.module.css";

function EvaReviewCheckModal({ evaReview, setEvaReviewModal }) {


  const onBackClickHandler = () => {
    setEvaReviewModal(false);

  };

  return (
    <div className={CSS.modal}>
      <div className={CSS.modalContainer}>
        <div className={CSS.close} onClick={onBackClickHandler}>
          X
        </div>
        <div className={CSS.adviceReviewModalDiv}>
          <div className={CSS.title}>
            <h1>평가 내역</h1>
          </div>
          <textarea
            placeholder="평가 내역 본문"
            name="evaWriteContent"
            readOnly={true}
            value={evaReview.evaWriteContent}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default EvaReviewCheckModal;
