import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import './Abs.css';
import { callAbsListAPI } from '../../apis/AbsAPICalls';
import AbsList from '../../component/lists/AbsList';
import PagingBar from "../../component/common/PagingBar";

const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
        return;
    }
    if (onCancel && typeof onCancel !== "function") {
        return;
    }

    const confirmAction = () => {
        if (window.confirm(message)) {
            onConfirm();
        } else {
            onCancel();
        }
    };

    return confirmAction;
};

function Abs() {

    const [currentPage, setCurrentPage] = useState(1)
    const abs = useSelector(state => state.absReducer);
    const absList = abs.data;
    const dispatch = useDispatch();


    const okConfirm = () => console.log("등록되었습니다.");
    const cancelConfirm = () => console.log("취소되었습니다.");

    const absStartConfirm = useConfirm(
        "출근 하시겠습니까?",
        okConfirm,
        cancelConfirm
    );

    const absEndConfirm = useConfirm(
        "퇴근 하시겠습니까?",
        okConfirm,
        cancelConfirm
    );

    useEffect(() => {
        dispatch(callAbsListAPI({ currentPage }));
    }, [dispatch, currentPage]);


    return (
        <>
            <Header
                title="근태"
            />

            <div className="abs-wrapp">

                <div className="abs-menu-bar">
                    <NavLink to="/abs" >
                        <div className="abs-menu" >
                            내 근태
                        </div>
                    </NavLink>

                    <NavLink to="/abs/teamAbs" >
                        <div className="abs-menu" style={{ color: 'gray' }}>
                            구성원 근태
                        </div>
                    </NavLink>

                </div>
                <div className="abs-btns">
                    <button className="abs-start-btn"
                        onClick={absStartConfirm}>출근하기</button>
                    <button className="abs-end-btn"
                        onClick={absEndConfirm}>퇴근하기</button>
                </div>

                <div className="abs-search-container">
                    <input className="abs-searchDate"
                        type="date"
                        name="selectDate"

                    />
                    <button className="abs-SearchBtn">
                        <img src="/images/search.png" alt="검색" />
                    </button>
                </div>

                <div>
                    {absList && <AbsList absList={absList} />}
                </div>
                <div>
                    {abs.pageInfo && <PagingBar pageInfo={abs.pageInfo} setCurrentPage={setCurrentPage} />}


                </div>

            </div>

        </>
    );

}


export default Abs;