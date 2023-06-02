import { useEffect, useState } from 'react'
import Header from '../../component/common/Header'
import './Emp.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callEmpListAPI, empListDeptAPI, empListSearchAPI } from '../../apis/EmpAPICalls';
import EmpList from '../../component/lists/EmpList';
import PagingBar from './../../component/common/PagingBar';
import RestList from '../../component/lists/RestList';
import ProtectedRoute from "../../component/router/ProtectedRoute";

function Emp() {

  const title = "구성원";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {emp} = useSelector(state => state.empReducer);
  console.log('emp : ', {emp});
  // const empList = emp.data;
  // const pageInfo = emp.pageInfo;
  const [searchOption, setSearchOption] = useState('name');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [allEmpList, setAllEmpList] = useState(false);

  useEffect(
    () => {
      dispatch(callEmpListAPI({ currentPage }));
    }, [currentPage]
  );

  /* 검색 옵션 상태 저장 */
  const onSearchOptionChangeHandler = (e) => {
    setSearchOption(e.target.value);
    console.log('searchOption : ', searchOption)
  }

  /* 검색어 입력값 상태 저장*/
  const onSearchChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  }

  /* 검색버튼 누르면 검색화면으로 넘어가는 이벤트 */
  const onSearchBtnHandler = (e) => {
    console.log('searchBtnKeyword: ', searchKeyword);
    console.log('searchBtnOption : ', searchOption);
    dispatch(empListSearchAPI({ searchOption, searchKeyword, currentPage }));
    setAllEmpList(true);
  }

  /* Enter키 입력 시 검색화면으로 넘어가는 이벤트 */
  const onEnterKeyHandler = (e) => {
    if (e.key === 'Enter') {
      console.log('searchBtnKeyword: ', searchKeyword);
      console.log('searchBtnOption : ', searchOption);
      dispatch(empListSearchAPI({ searchOption, searchKeyword, currentPage }));
      setAllEmpList(true);
    }
  }

  /* 전체 조회 */
  const onEmpListHandler = (e) => {
    dispatch(callEmpListAPI({ currentPage }));
    setAllEmpList(true);
  }


  /* 전체 조회 off */
  const onEmpOffHandler = (e) => {
    setAllEmpList(false);
  }

  /* 부서별 조회 */
  const EmpListDeptHandler = (e) => {
    dispatch(empListDeptAPI({ deptCode: e.target.getAttribute("name"), currentPage: 1 }));
    setAllEmpList(true);
  }



  return (
    <>
      <Header title={title} />

      <div className="EmpWrapper">

        <div className="abs-menu-bar">
          <NavLink to="/emp">
          <div className="abs-menu"
          // onClick={handleReloadPage}
          >
            조직도
          </div>
          </NavLink>

          {<ProtectedRoute adminCheck = {true}>
          <NavLink to="/emp/emprest">
          <div className="abs-menu" style={{ color: 'gray' }}>
            휴직내역
          </div>
          </NavLink>
          </ProtectedRoute>}
        </div>

        <div className="EmpSearchBox">
          <select
            id="EmpSelect"
            value={searchOption}
            onChange={onSearchOptionChangeHandler}
          >
            <option value="name">이름</option>
            <option value="dept">부서</option>
            <option value="job">직책</option>
          </select>

          <input
            type="text"
            id="EmpMainsearch"
            placeholder="  검색어를 입력하세요"
            onChange={onSearchChangeHandler}
            onKeyUp={onEnterKeyHandler}
          />

          <button
            className="abs-SearchBtn"
            onClick={onSearchBtnHandler}

          >
            <img src="/images/search.png" alt="검색" />
          </button >
        </div>

        <div className="EmpContWrapper">
          <ul className="EmpContBox">
            <li>
              <ul className="EmpContLeft">
                <li
                  className="EmpContLeftTit"
                  onClick={onEmpOffHandler}
                >
                  more than us
                </li>
                <li
                  className="EmpContLeftSubTit"
                  onClick={onEmpListHandler}
                >
                  전체 구성원
                </li>
                <li>
                  <ul className="EmpContLeftDept">
                    <li name="DE0001" onClick={EmpListDeptHandler}>• 행정팀</li>
                    <li name="DE0002" onClick={EmpListDeptHandler}>• 경영지원팀</li>
                    <li name="DE0003" onClick={EmpListDeptHandler}>• 강사팀</li>
                    <li name="DE0004" onClick={EmpListDeptHandler}>• 홍보팀</li>
                    <li name="DE0005" onClick={EmpListDeptHandler}>• 개발팀</li>
                  </ul>
                </li>
              </ul>
            </li>
            {allEmpList ? (
              <li>
                <ul className="EmpContRight">
                  <li>
                    {emp.data && <EmpList empList={emp.data} />}
                  </li>
                </ul>

                <div className="EmpPaging">
                  {emp.pageInfo && <PagingBar pageInfo={emp.pageInfo} setCurrentPage={setCurrentPage} />}
                </div>

              </li>
            ) : null}
          </ul>

          <button
            className="EmpEntBtn"
            type="button"
            onClick={() => navigate('/emp/empregistration')}
          >
            + 구성원 등록하기
          </button>

        </div>

        <div>

        </div>
      </div>
    </>
  )
}

export default Emp