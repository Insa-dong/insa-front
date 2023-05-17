import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import './Abs.css';
import { callMyAbsListAPI, callCheckInAPI } from '../../apis/AbsAPICalls';
import MyAbsList from '../../component/lists/MyAbsList';
import PagingBar from "../../component/common/PagingBar";

function Abs() {
    const [currentPage, setCurrentPage] = useState(1);
    const abs = useSelector(state => state.absReducer);
    const myAbsList = abs.data || [];
    const dispatch = useDispatch();
    const params = useParams();
    const empCode = params.empCode;

    useEffect(() => {
        dispatch(callMyAbsListAPI({ empCode, currentPage }));
    }, [dispatch, currentPage]);

    const handleCheckIn = async () => {
        const confirmResult = window.confirm("출근 하시겠습니까?");
        if (confirmResult) {
            try {
                await dispatch(callCheckInAPI());
                console.log("출근이 입력되었습니다.");
            } catch (error) {
                console.error("출근 입력에 실패했습니다.", error);
            }
        }
    };

    return (
        <>
            <Header title="근태" />

            <div className="abs-wrapp">
                <div className="abs-menu-bar">
                    <NavLink to="/abs">
                        <div className="abs-menu">
                            내 근태
                        </div>
                    </NavLink>

                    <NavLink to="/abs/adminAbs">
                        <div className="abs-menu" style={{ color: 'gray' }}>
                            구성원 근태
                        </div>
                    </NavLink>
                </div>

                <div className="abs-btns">
                    <button className="abs-start-btn" onClick={handleCheckIn}>
                        출근하기
                    </button>
                    <button className="abs-end-btn">퇴근하기</button>
                </div>

                <div className="abs-search-container">
                    <input className="abs-searchDate" type="date" name="selectDate" />
                    <button className="abs-SearchBtn">
                        <img src="/images/search.png" alt="검색" />
                    </button>
                </div>

                <div>
                    {myAbsList && <MyAbsList myAbsList={myAbsList} />}
                </div>
                <div>
                    {abs.pageInfo && <PagingBar pageInfo={abs.pageInfo} setCurrentPage={setCurrentPage} />}
                </div>
            </div>
        </>
    );
}

export default Abs;