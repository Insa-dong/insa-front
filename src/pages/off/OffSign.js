import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import SignOffList from '../../component/lists/SignOffList';
import PagingBar from '../../component/common/PagingBar';
import { callSignOffListAPI } from '../../apis/OffAPICalls';

function OffSign() {

    const [currentPage, setCurrentPage] = useState(1)
    const { signOff } = useSelector(state => state.offReducer);
    const signOffList = signOff?.data || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callSignOffListAPI({ currentPage }));
    }, [dispatch, currentPage]);


    return (
        <>
            <Header title="연차" />

            <div className="off-wrapp">
                <div className="off-menu-bar">
                    <NavLink to="/off">
                        <div className="off-menu" style={{ color: 'gray' }} >
                            내 연차
                        </div>
                    </NavLink>

                    <NavLink to="/off/adminOff">
                        <div className="off-menu" >
                            구성원 연차
                        </div>
                    </NavLink>
                </div>
                <div className="adminOff-menu-bar" >
                    <NavLink to="/off/adminOff" activeClassName="active-link" style={{ color: 'gray' }}>
                        <div className="admin-off-menu">
                            연차 현황
                        </div>
                    </NavLink>

                    <NavLink to="/off/adminOff/offSign" activeClassName="active-link">
                        <div className="admin-off-menu">
                            연차 신청내역
                        </div>
                    </NavLink>
                </div>

                <div>
                    {signOffList && <SignOffList signOffList={signOffList} />}
                </div>
                <div>
                    {signOff && signOff.pageInfo && <PagingBar pageInfo={signOff.pageInfo} setCurrentPage={setCurrentPage} />}
                </div>

            </div>

        </>
    )

}

export default OffSign;