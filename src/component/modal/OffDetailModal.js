import './OffDetailModal.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { callOffDetailAPI } from '../../apis/OffAPICalls';

function OffDetailModal({off, setOffDetailModal}) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callOffDetailAPI({ signCode: off.signCode }));
    },[dispatch, off]);


    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setOffDetailModal(false);
        }
    };

    return (
        <div className="abs-modify-modal" onClick={onClickOutsideModal} >
            <div className="absModalContainer">
                <div className="absModalClose" onClick={() => setOffDetailModal(false)}>
                    x
                </div>
                <div className="absModalDiv">


                    <h1 className="absModalTitle">연차 상세 조회</h1>

                    <div className="absField">
                        <h1>신청일</h1>
                        <input
                            type="text"
                            name="requestDate"
                            value={off.requestDate}
                            readOnly={true}
                        />
                    </div>
                    <div className="absField">
                        <h1>연차 시작일</h1>
                        <input
                            type="text"
                            name="offStart"
                            value={off.offStart}
                            readOnly={true}
                        />
                    </div>
                    <div className="absField">
                        <h1>연차 종료일</h1>
                        <input
                            type="text"
                            name="offEnd"
                            value={off.offEnd}
                            readOnly={true}
                        />
                    </div>
                    <div className="absField">
                        <h1>연차일수</h1>
                        <input
                            type="text"
                            name="offDay"
                            value={off.offDay}
                            readOnly={true}
                        />
                    </div>

                    <div className="absField">
                        <h1>승인상태</h1>
                        <input
                            type="text"
                            name="signStatus"
                            value={off.signStatus}
                            readOnly={true}
                        />
                    </div>
                    <div className="absField">
                        <h1>결재권자</h1>
                        <input
                            type="text"
                            name="signPayer.empName"
                            value={off.signPayer.empName}
                            readOnly={true}
                        />
                    </div>
                    <div className="absField">
                        <h1>결재일</h1>
                        <input
                            type="text"
                            name="handleDate"
                            value={off.handleDate || ''}
                            readOnly={true}
                        />
                    </div>
                    <div className="absField">
                        <h1>결재사유</h1>
                        <input
                            type="text"
                            name="returnReason"
                            value={off.returnReason || ''}
                            readOnly={true}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OffDetailModal;