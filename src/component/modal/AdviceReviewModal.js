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
                        <h1>상담일지</h1>
                    </div>

                    <h1>수정 일</h1>
                    
                    <input
                        type="text"
                        name="adviceLogUpdate"
                        readOnly={true}
                        value={adviceReview.adviceLogUpdate}
                        />

                    <textarea
                        placeholder="상담 일지 본문"
                        name="adviceLogContent"
                        readOnly={true}
                        value={adviceReview.adviceLogContent}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default AdviceReviewModal;
