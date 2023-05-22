import CSS from "./BoardRegistModal.module.css"

function BoardRegistModal({ isRegistOpen, onRegistClose }) {

    const handleBackgroundClick = () => {
        onRegistClose();
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        isRegistOpen && (
            <div className={CSS.modal} onClick={handleBackgroundClick}>
                <div className={CSS.modalContainer} onClick={handleModalClick}>
                    <div className={CSS.close} onClick={onRegistClose}>X</div>
                    <div className={CSS.edgeContainer}>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.boardContentImg}><img src="/images/공지내용.png" className={CSS.fileImg} alt="공지내용이미지" /></li>
                            <li className={CSS.boardContent}>제목</li>
                        </ul>
                        <input className={CSS.title}></input>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.boardContentImg}><img src="/images/공지내용.png" className={CSS.fileImg} alt="공지내용이미지" /></li>
                            <li className={CSS.boardContent}>공지내용</li>
                        </ul>
                        <input className={CSS.content}></input>
                        <div>
                            <img src="/images/파일첨부.png" className={CSS.fileImgg} alt="파일첨부이미지" />
                            <input clssName={CSS.file} multiple="multiple" type="file" name="file"></input>
                        </div>
                        <button
                            className={CSS.ButtonStyle2}
                        >
                            등록하기
                        </button>
                    </div>
                </div>

            </div>
        )
    );
}

export default BoardRegistModal;