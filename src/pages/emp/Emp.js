import { useEffect, useState } from 'react'
import Header from '../../component/common/Header'
import './Emp.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callEmpListAPI } from '../../apis/EmpAPICalls';
import EmpList from '../../component/lists/EmpList';


function Emp() {

  const title = "구성원";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emp = useSelector(state => state.empReducer);
  console.log('emp : ', emp);
  const empList = emp.data;
  const [searchOption, setSearchOption] = useState('name');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [allEmpList, setAllEmpList] = useState(false);

  useEffect(
    () => {
      dispatch(callEmpListAPI({currentPage}));
    },
    [currentPage]
  );

  /* 검색 옵션 상태 저장 */
  const onSearchOptionChangeHandler = (e) => {
    setSearchOption(e.target.value);
  }

  /* 검색어 입력값 상태 저장*/
  const onSearchChangeHandler = (e) => {
    setSearchKeyword(e.target.value);
  }

  /* 검색버튼 누르면 검색화면으로 넘어가는 이벤트 */
  const onSearchBtnHandler = (e) => {
    navigate(`/search?searchOption=${searchOption}&searchKeyword=${searchKeyword}`);
  }

  /* Enter키 입력 시 검색화면으로 넘어가는 이벤트 */
  const onEnterKeyHandler = (e) => {
    if(e.key === 'Enter'){
      console.log('Enter key: ', searchKeyword);
      navigate(`/search?searchOption=${searchOption}&searchKeyword=${searchKeyword}`);
    }
  }

  /* 전체 조회 */
  const onEmpListHandler = (e) => {
    setAllEmpList(true);
  }

  return (
    <>
      <Header title={title} />
      <div className="EmpWrapper">

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
            id="search" 
            placeholder="  검색어를 입력하세요" 
            onChange={onSearchChangeHandler}
          />

          <button 
            className="EmpSearchBtn"
            onClick={onSearchBtnHandler}
            onKeyUp={onEnterKeyHandler}
          >
            <img src="/images/search.png" alt="검색" />
          </button >
        </div>

        <div className="EmpContWrapper">
          <ul className="EmpContBox">
            <li >
              <ul className="EmpContLeft">
                <li className="EmpContLeftTit">more than us</li>
                <li 
                  className="EmpContLeftSubTit"
                  onClick={onEmpListHandler}
                >
                  전체 구성원
                </li>
                <ul className="EmpContLeftDept">
                  <li>• 행정팀</li>
                  <li>• 경영지원팀</li>
                  <li>• 강사팀</li>
                  <li>• 홍보팀</li>
                  <li>• 개발팀</li>
                </ul>
              </ul>

            </li>
            <li >
              <ul className="EmpContRight">
                <li>
                  <EmpList empList={empList} />
                  {/* { empList && <EmpList empList={empList}/>} */}
                </li>
              </ul>
            </li>
          </ul>

            <button className="EmpEntBtn" type="button">+ 구성원 등록하기</button>

            <div className="EmpPaging">
              
            </div>
        </div>

      </div>
    </>
  )
}

export default Emp