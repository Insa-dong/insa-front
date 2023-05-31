import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import SignOffList from '../../component/lists/SignOffList';
import PagingBar from '../../component/common/PagingBar';
import { callSignOffListAPI } from '../../apis/OffAPICalls';
import './OffSign.css';

function OffSign() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const [searchOption, setSearchOption] = useState('empName');
    const [searchKeyword, setSearchKeyword] = useState('');
    const { signOff } = useSelector(state => state.offReducer);
    const signOffList = signOff?.data || [];


    useEffect(() => {
        const fetchData = () => {
            dispatch(callSignOffListAPI({ currentPage, searchOption, searchKeyword }));
        };

        fetchData();
    }, [currentPage]);

    /* 검색 옵션 상태 저장 */
    const handleSearchOptionChange = (e) => {
        const selectedOption = e.target.value;
        setSearchOption(selectedOption);
    };

    /* 검색어 입력값 상태 저장*/
    const handleSearchKeywordChange = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
    };

/* 검색 이벤트 */
const handleSearch = () => {
    setCurrentPage(1);
    // 승인 상태가 '전체'이거나 검색 키워드가 없을 때 모든 결과를 보여주는 API를 호출합니다.
    if ((searchOption === 'signStatus' && (searchKeyword === '전체' || searchKeyword === '')) || 
    (searchOption === 'empName' && searchKeyword === '')) {
        dispatch(callSignOffListAPI({ currentPage, searchOption: '', searchKeyword: '' }));
    } else {
        // 그 외의 경우에는 선택한 검색 옵션과 키워드로 검색합니다.
        dispatch(callSignOffListAPI({ currentPage, searchOption, searchKeyword }));
    }
};

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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

                    <NavLink to="/off/teamOff">
                        <div className="off-menu" >
                            구성원 연차
                        </div>
                    </NavLink>
                </div>
                <div className="adminOff-menu-bar" >
                    <NavLink to="/off/teamOff" className="active-link" style={{ color: 'gray' }}>
                        <div className="team-off-menu">
                            연차 현황
                        </div>
                    </NavLink>

                    <NavLink to="/off/teamOff/offSign" className="active-link">
                        <div className="team-off-menu">
                            연차 신청내역
                        </div>
                    </NavLink>
                </div>

                <div className="OffSignSearchBox">
                    <select
                        id="OffSignSelect"
                        value={searchOption}
                        onChange={handleSearchOptionChange}
                    >
                        <option value="empName">이름</option>
                        <option value="signStatus">승인상태</option>
                    </select>


                    {searchOption === 'signStatus' && (
                        <select className='SignStatusSelect'
                            id="SignStatusSelect"
                            value={searchKeyword}
                            onChange={handleSearchKeywordChange}
                            onKeyUp={handleEnterKey}
                        >
                            <option value="전체">전체</option>
                            <option value="승인">승인</option>
                            <option value="반려">반려</option>
                            <option value="대기">대기</option>
                        </select>
                    )}

                    {searchOption !== 'signStatus' && (
                        <input className='OffSignsearch'
                            type="text"
                            id="OffSignsearch"
                            placeholder="검색어를 입력하세요"
                            onChange={handleSearchKeywordChange}
                            onKeyUp={handleEnterKey}
                        />
                    )}

                    <button
                        className="off-SearchBtn"
                        onClick={handleSearch}
                    >
                        <img src="/images/search.png" alt="검색" />
                    </button >
                </div>

                <div>
                    {signOffList.length > 0 ? ( // 검색 결과가 있을 때
                        <SignOffList
                            signOffList={signOffList}
                            currentPage={currentPage}
                            searchOption={searchOption}
                            searchKeyword={searchKeyword}
                        />
                    ) : (
                        <SignOffList // 검색 결과가 없을 때 전체 목록 출력
                            signOffList={signOffList}
                            currentPage={currentPage}
                            searchOption=""
                            searchKeyword=""
                        />
                    )}
                </div>


                <div className="offSignPageDiv">
                    {signOff && signOff.pageInfo && <PagingBar pageInfo={signOff.pageInfo} setCurrentPage={setCurrentPage} />}
                </div>

            </div>

        </>
    )

}

export default OffSign;