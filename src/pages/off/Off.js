import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from "../../component/common/Header";
import './Off.css';
import OffApplyModal from '../../component/modal/OffApplyModal';
import OffComingList from '../../component/lists/OffComingList';
import OffPastList from '../../component/lists/OffPastList';
import { callComingupOffListAPI, callPastOffListAPI } from '../../apis/OffAPICalls';
import { useDispatch, useSelector } from 'react-redux';

function Off() {

    const [offApplyModal, setOffApplyModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { comingUpOffList, pastOffList } = useSelector(state => state.offReducer);
    const offComingList = comingUpOffList.data || [];
    const offPastList = pastOffList.data || [];
    const [searchYear, setSearchYear] = useState('');

    useEffect(() => {
        const fetchOffData = async () => {
          try {
            await dispatch(callComingupOffListAPI());
            await dispatch(callPastOffListAPI());
          } catch (error) {
            console.error('API 호출 에러:', error);
            // 에러 처리를 원하는 대로 수행
          }
        };
      
        fetchOffData();
      }, []);

      const handleReloadPage = () => {
        navigate('/off', { replace: true });
        window.location.reload();
    };

    const onClickOffApplyHandler = () => {
        setOffApplyModal(true);
    };

    const handleYearChange = (event) => {
        setSearchYear(event.target.value);
    };

    const handleSearchYear = () => {
        if (searchYear) {
            dispatch(callPastOffListAPI(searchYear));
        }
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

                <p className='comingup-title' onClick={handleReloadPage}> 사용 기록 </p>
                <div className="my-off-request">
                <div className="off-search-container">
                    <input className="off-searchYear"
                        type="text"
                        name="searchYear"
                        value={searchYear}
                        placeholder='2023'
                        onChange={handleYearChange}
                    />
                    <button className="off-SearchBtn" onClick={handleSearchYear}>
                        <img src="/images/search.png" alt="검색" />
                    </button>
                </div>
                    <div>
                        {offPastList && <OffPastList offPastList={offPastList} />}
                    </div>
                </div>

            </div>
        </>
    )

};

export default Off;