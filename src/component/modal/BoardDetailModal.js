import CSS from "./BoardDetailModal.module.css";

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", weekday: "short", hour12: false };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
}

function BoardDetailModal({ isOpen, onClose, selectedItem }) {

    const handleBackgroundClick = () => {
        onClose();
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        isOpen && selectedItem && (
            <div className={CSS.modal} onClick={handleBackgroundClick}>
                <div className={CSS.modalContainer} onClick={handleModalClick}>
                    <div className={CSS.close} onClick={onClose}>X</div>
                    <div className={CSS.edgeContainer}>
                        <ul style={{ display: 'flex', marginTop: '1vw' }}>
                            <ul>
                                <li id={CSS.prof}></li>
                            </ul>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.writer}>{selectedItem.noticeWriter.empName}</li>
                                <li><img src="/images/화살표.png" className={CSS.allowImg} alt="화살표이미지" /> </li>
                                <li className={CSS.dept}>{selectedItem.noticeWriter.dept.deptName}팀·</li>
                                <li className={CSS.job}>{selectedItem.noticeWriter.job.jobName}</li>
                            </ul>
                            <ul style={{ display: 'flex' }}>
                                <li className={CSS.writeDate}>작성일</li>
                                <li className={CSS.date}>{formatDate(selectedItem.noticeWriteDate)}</li>
                            </ul>
                        </ul>
                        <input className={CSS.title}></input>
                        <div><img src="/images/파일첨부.png" className={CSS.fileImg} alt="파일첨부이미지" /></div>
                        <ul style={{ display: 'flex' }}>
                            <li className={CSS.boardContentImg}><img src="/images/공지내용.png" className={CSS.fileImg} alt="공지내용이미지" /></li>
                            <li className={CSS.boardContent}>공지내용</li>
                        </ul>
                        <input className={CSS.content}></input>
                    </div>
                </div>

            </div>
        )
    );

}


export default BoardDetailModal;