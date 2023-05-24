import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callEmpRecordAPI } from '../../apis/EmpAPICalls';
import './EmpRecordModal.css';
import EmpRecordItem from '../items/EmpRecordItem';
import PagingBar from '../common/PagingBar';

function EmpRecordModal({ empCode, setEmpRecordModal }) {
    console.log("hello", empCode);
    const dispatch = useDispatch();
    const { empRecord } = useSelector(state => state.empReducer);
    const [currentPage, setCurrentPage] = useState(1);

    console.log('empRecord', empRecord);
    console.log('=================');
    const pageInfo = empRecord?.pageInfo;


    useEffect(
        () => {
            // if (empRecord?.status === 200) {
            dispatch(callEmpRecordAPI({ empCode, currentPage }));
            // }
        }, [currentPage]
    );

    const onClickOutsideModal = (e) => {
        if (e.target === e.currentTarget) {
            setEmpRecordModal(false);
        }
    };

    const onCloseModal = () => {
        setEmpRecordModal(false);
    };



    return (
        <div className="Emp-modify-modal" onClick={onClickOutsideModal}>
            <div className="EmpModalContainer">
                <div className="EmpModalClose" onClick={onCloseModal}>
                    x
                </div>
                <div className="EmpModalDiv">
                    <h1 className="EmpRecordModalTitle">📋 인사이력</h1>
                    <table className="EmpRecordWrap">
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>분류</th>
                                <th>내역</th>
                            </tr>
                        </thead>

                        <tbody>
                            {empRecord?.data && empRecord.data.length > 0 ? (
                                empRecord.data.map((emp) => (
                                    <EmpRecordItem key={emp.empCode} emp={emp} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">인사이력이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="EmpRecordPaging">
                    {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
                </div>
            </div>
        </div>
    )
}

export default EmpRecordModal