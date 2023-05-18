import CSS from "./BoardDetailModal.module.css";

function BoardDetailModal() {

    const onClickHandler = () => {

    }

    return (
        <div className={CSS.modal}>
            <div className={CSS.modalContainer}>
                <div className={CSS.close} onClick={onClickHandler}>
                    X
                </div>
            </div>
        </div>
    );
}

export default BoardDetailModal;