import CSS from "./BoardDetailModal.module.css";

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false};
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  }

function BoardDetailModal({ isOpen, onClose, selectedItem }) {

    return (
        isOpen && selectedItem && (
            <div className={CSS.modal}>
                <div className={CSS.modalContainer}>
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
                    </div>
                </div>

            </div>
        )
    );

}


export default BoardDetailModal;