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
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchOption, setSearchOption] = useState('empName');
    const { rest } = useSelector(state => state.empReducer);
    const { restState } = useSelector(state => state.empReducer);
    const [currentPage, setCurrentPage] = useState(1);

    console.log('rest : ', { rest });


    useEffect(
        () => {
            dispatch(callEmpRestList({ currentPage }))
        }, [currentPage]
    );

    useEffect(
        () => {
            if (restState?.status == 200)
                dispatch(callEmpRestList({ currentPage }))
        }, [restState]
    );

        /* 검색 옵션 상태 저장 */
        const onSearchOptionChangeHandler = (e) => {
            setSearchOption(e.target.value);
        }
    
        /* 검색어 입력값 상태 저장*/
        const onSearchChangeHandler = (e) => {
            setSearchKeyword(e.target.value);
        }

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

                <div className="EmpSearchBox">
                    <select
                        id="EmpSelect"
                        value={searchOption}
                        onChange={onSearchOptionChangeHandler}
                    >
                        <option value="name">이름</option>
                        <option value="state">승인상태</option>
                    </select>

                    {searchOption === "state" && (
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

                    {searchOption !== "state" && (
                        <input
                            type="text"
                            id="OffSignsearch"
                            placeholder="검색어를 입력하세요"
                            onChange={onSearchChangeHandler}
                        />
                    )}

                    <button
                        className="abs-SearchBtn"
                        // onClick={onSearchBtnHandler}

                    >
                        <img src="/images/search.png" alt="검색" />
                    </button >
                </div>

                <div>
                    {rest?.data && <RestList restList={rest.data} />}
                </div>

                <div>
                    {rest?.pageInfo && <PagingBar pageInfo={rest.pageInfo} setCurrentPage={setCurrentPage} />}
                </div>
            </div>
        </>
    )
}

export default EmpRest