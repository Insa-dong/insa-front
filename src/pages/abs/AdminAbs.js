import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import './AdminAbs.css';
import AbsList from '../../component/lists/AbsList';
import PagingBar from '../../component/common/PagingBar';
import { callAbsListAPI, callAbsDateAPI } from '../../apis/AbsAPICalls';

function AdminAbs() {

    const [currentPage, setCurrentPage] = useState(1)
    const [selectedDate, setSelectedDate] = useState('');
    const abs = useSelector(state => state.absReducer);
    const absList = abs.data || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callAbsListAPI({ currentPage }));
    }, [dispatch, currentPage]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSearchDate = () => {
        if (selectedDate) {
            dispatch(callAbsDateAPI({ absDate: selectedDate, currentPage }));
        }
    };


    return (
        <>
            <Header
                title="근태"
            />

            <div className="abs-wrapp">

                <div className="abs-menu-bar">
                    <NavLink to="/abs" >
                        <div className="abs-menu" style={{ color: 'gray' }} >
                            내 근태
                        </div>
                    </NavLink>

                    <NavLink to="/abs/adminAbs" >
                        <div className="abs-menu">
                            구성원 근태
                        </div>
                    </NavLink>

                </div>

                <div className="abs-search-container">
                    <input className="abs-searchDate"
                        type="date"
                        name="selectDate"
                        value={selectedDate}
                        onChange={handleDateChange}

                    />
                    <button className="abs-SearchBtn" onClick={handleSearchDate}>
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
    )
}

export default AdminAbs;