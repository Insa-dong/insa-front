import { useEffect, useState } from 'react'
import Header from '../../component/common/Header'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callEmpRestList } from '../../apis/EmpAPICalls';
import RestList from '../../component/lists/RestList';
import PagingBar from './../../component/common/PagingBar';


function EmpRest() {
 
    const title = "구성원";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {rest} = useSelector(state => state.empReducer);
    const [currentPage, setCurrentPage] = useState(1);
    
    console.log('rest : ', {rest});

    

    useEffect(
        () => {
            dispatch(callEmpRestList({ currentPage }))
        }, [currentPage]
    );

    return (
        <>
            <Header title={title} />

            <div className="EmpWrapper">

                <div className="abs-menu-bar">
                    <NavLink to="/emp">
                        <div className="abs-menu"
                         style={{ color: 'gray' }}
                        // onClick={handleReloadPage}
                        >
                            조직도
                        </div>
                    </NavLink>

                    <NavLink to="/emp/emprest">
                        <div className="abs-menu">
                            휴직내역
                        </div>
                    </NavLink>
                </div>

                <div className="abs-search-container">
                    <input className="abs-searchDate"
                        type="date"
                        name="selectDate"
                        // value={selectedDate}
                        // onChange={handleDateChange}

                    />
                    <button className="abs-SearchBtn" 
                    // onClick={handleSearchDate}
                    >
                        <img src="/images/search.png" alt="검색" />
                    </button>
                </div>

                <div>
                    {rest?.data && <RestList restList={rest.data}/>}
                </div>

                <div>
                {rest?.pageInfo && <PagingBar pageInfo={rest.pageInfo} setCurrentPage={setCurrentPage} />}
                </div>
            </div>
        </>
    )
}

export default EmpRest