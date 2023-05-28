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


    const fetchData = () => {
        dispatch(callSignOffListAPI({ currentPage, searchOption, searchKeyword }));
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, searchOption, searchKeyword]); // 초기 로딩 시에만 실행하도록 빈 배열로 설정

    /* 검색 옵션 상태 저장 */
    const onSearchOptionChangeHandler = (e) => {
        setSearchOption(e.target.value);
    }

    /* 검색어 입력값 상태 저장*/
    const onSearchChangeHandler = (e) => {
        setSearchKeyword(e.target.value);
    }

    /* 검색 이벤트 */
    const handleSearch = () => {
        let updatedSearchOption = searchOption;
        let updatedSearchKeyword = searchKeyword;
      
        if (searchOption === 'empName' && searchKeyword.trim() === '') {
          updatedSearchOption = '';
          updatedSearchKeyword = '';
        } else if (searchOption === 'signStatus' && searchKeyword === '전체') {
          updatedSearchOption = '';
          updatedSearchKeyword = '';
        }
      
        dispatch(callSignOffListAPI({ currentPage, searchOption: updatedSearchOption, searchKeyword: updatedSearchKeyword }));
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
      };
      
      const onSearchBtnHandler = () => {
        handleSearch();
      };
      
      const onEnterKeyHandler = (e) => {
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

                    <NavLink to="/off/adminOff">
                        <div className="off-menu" >
                            구성원 연차
                        </div>
                    </NavLink>
                </div>
                <div className="adminOff-menu-bar" >
                    <NavLink to="/off/adminOff" className="active-link" style={{ color: 'gray' }}>
                        <div className="admin-off-menu">
                            연차 현황
                        </div>
                    </NavLink>

                    <NavLink to="/off/adminOff/offSign" className="active-link">
                        <div className="admin-off-menu">
                            연차 신청내역
                        </div>
                    </NavLink>
                </div>

                <div className="OffSignSearchBox">
                    <select
                        id="OffSignSelect"
                        value={searchOption}
                        onChange={onSearchOptionChangeHandler}
                    >
                        <option value="empName">이름</option>
                        <option value="signStatus">승인상태</option>
                    </select>


                    {searchOption === 'signStatus' && (
                        <select
                            id="SignStatusSelect"
                            value={searchKeyword}
                            onChange={onSearchChangeHandler}
                        >
                            <option value="전체">전체</option>
                            <option value="승인">승인</option>
                            <option value="반려">반려</option>
                            <option value="대기">대기</option>
                        </select>
                    )}

                    {searchOption !== 'signStatus' && (
                        <input
                            type="text"
                            id="OffSignsearch"
                            placeholder="검색어를 입력하세요"
                            onChange={onSearchChangeHandler}
                            onKeyUp={onEnterKeyHandler}
                        />
                    )}

                    <button
                        className="off-SearchBtn"
                        onClick={onSearchBtnHandler}
                    >
                        <img src="/images/search.png" alt="검색" />
                    </button >
                </div>

                <div>
                    {signOffList && (
                        <SignOffList
                            signOffList={signOffList}
                            currentPage={currentPage}
                            searchOption={searchOption}
                            searchKeyword={searchKeyword}
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