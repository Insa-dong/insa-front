import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from "../../component/common/Header";
import './Off.css';
import OffApplyModal from '../../component/modal/OffApplyModal';
import OffComingList from '../../component/lists/OffComingList';
//import PagingBar from '../../component/common/PagingBar';
import { callComingupOffListAPI } from '../../apis/OffAPICalls';
import { useDispatch, useSelector } from 'react-redux';

function Off() {

   // const [currentPage, setCurrentPage] = useState(1)
    const [offApplyModal, setOffApplyModal] = useState(false);
    const dispatch = useDispatch();
    const off = useSelector(state => state.offReducer);
    const offComingList = off.data || [];
    
    useEffect(() => {
        dispatch(callComingupOffListAPI());
    }, []);


    const onClickOffApplyHandler = () => {
        setOffApplyModal(true);
    };

    return (
        <>
            <Header title="연차" />

            <div className="off-wrapp">
                <div className="off-menu-bar">
                    <NavLink to="/off">
                        <div className="abs-menu">
                            내 연차
                        </div>
                    </NavLink>

                    <NavLink to="/off/adminOff">
                        <div className="off-menu" style={{ color: 'gray' }}>
                            구성원 연차
                        </div>
                    </NavLink>
                </div>
                <button
                    className="applyOffBtn"
                    type="button"
                    onClick={onClickOffApplyHandler}
                >
                    + 연차 신청하기
                </button>
                {offApplyModal && (
                    <OffApplyModal
                        setOffApplyModal={setOffApplyModal}
                    />
                )}

                <div className="my-off-now">
                    <div className="offNowList">
                        <div>15</div>
                        <p>총 연차</p>
                    </div>
                    <div className="offNowList">
                        <div>3</div>
                        <p>사용 연차</p>
                    </div>
                    <div className="offNowList">
                        <div>12</div>
                        <p>잔여 연차</p>
                    </div>
                </div>
                <p className='comingup-title'> 예정 연차 </p>
                <div className="my-off-request">
                <div>
                    {offComingList && <OffComingList offComingList={offComingList} />}
                </div>

                </div>

            </div>
        </>
    )

};

export default Off;