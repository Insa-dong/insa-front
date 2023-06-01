import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import './TeamOff.css';
import TeamOffList from '../../component/lists/TeamOffList';
import PagingBar from '../../component/common/PagingBar';
import { callAdminOffListAPI } from '../../apis/OffAPICalls';

function AdminOff() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const [searchOption, setSearchOption] = useState('empName');
    const [searchKeyword, setSearchKeyword] = useState('');
    const { adminOff } = useSelector(state => state.offReducer);
    const teamOffList = adminOff?.data || [];


    useEffect(() => {
 
        const fetchData = () => {
            dispatch(callAdminOffListAPI({ currentPage, searchOption, searchKeyword }));
        };

        fetchData();
    }, [currentPage]);



    /* 검색 옵션 상태 저장 */
    const handleSearchOptionChange = (e) => {
        const selectedOption = e.target.value;
        setSearchOption(selectedOption);
        setSearchKeyword(''); // 검색어 초기화
    };
    /* 검색어 입력값 상태 저장*/
    const handleSearchKeywordChange = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
    };


    /* 검색 이벤트 */
    const handleSearch = () => {
        setCurrentPage(1);
        dispatch(callAdminOffListAPI({ currentPage, searchOption, searchKeyword }));
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
                <div className="teamOff-menu-bar" >
                    <NavLink to="/off/teamOff" className="active-link">
                        <div className="team-off-menu"  >
                            연차 현황
                        </div>
                    </NavLink>

                    {/*<NavLink to="/off/teamOff/offSign" className="active-link" style={{ color: 'gray' }}>
                        <div className="team-off-menu" >
                            연차 신청내역
                        </div>
    </NavLink>*/}
                </div>

                <div className="TeamOffSearchBox">
                    <select
                        id="TeamOffSelect"
                        value={searchOption}
                        onChange={handleSearchOptionChange}
                    >
                        <option value="empName">이름</option>
                        <option value="deptName">부서</option>
                        <option value="remainingOff">잔여연차</option>
                    </select>


                    {searchOption === 'remainingOff' ? (
                        <input
                            id="TeamOffRemainingOff"
                            value={searchKeyword}
                            placeholder='입력값 이상 목록을 조회합니다'
                            onChange={handleSearchKeywordChange}
                            onKeyUp={handleEnterKey}
                        />
                    ) :  searchOption === 'deptName' ? (
                        <input
                          type="text"
                          id="TeamOffDeptName"
                          placeholder="부서를 입력하세요"
                          onChange={handleSearchKeywordChange}
                          onKeyUp={handleEnterKey}
                        />
                      ) : (
                        <input
                          type="text"
                          id="TeamOffEmpName"
                          placeholder="검색어를 입력하세요"
                          onChange={handleSearchKeywordChange}
                          onKeyUp={handleEnterKey}
                        />
                      )}
                    <button
                        className="Teamoff-SearchBtn"
                        onClick={handleSearch}
                    >
                        <img src="/images/search.png" alt="검색" />
                    </button >
                </div>

                <div>
                    {teamOffList.length > 0 ? ( // 검색 결과가 있을 때
                        <TeamOffList
                            teamOffList={teamOffList}
                            currentPage={currentPage}
                            searchOption={searchOption}
                            searchKeyword={searchKeyword}
                        />
                    ) : (
                        <TeamOffList // 검색 결과가 없을 때 전체 목록 출력
                            teamOffList={teamOffList}
                            currentPage={currentPage}
                            searchOption=""
                            searchKeyword=""
                        />
                    )}
                </div>
                <div>
                    {adminOff && <PagingBar pageInfo={adminOff.pageInfo} setCurrentPage={setCurrentPage} />}
                </div>

            </div>


        </>
    )

};

export default AdminOff;
