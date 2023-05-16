
function AdviceReviewModal({ adviceReview, setAdviceReviewModal }) {

    const onClickHandler = () => {
        setAdviceReviewModal(false);
    };

    return (
        <>
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
            <button onClick={onClickHandler}>
                돌아가기
            </button>
        </>
    );
}

export default AdviceReviewModal;
