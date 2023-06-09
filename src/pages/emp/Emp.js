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
import {isAdmin} from "../../utils/TokenUtils";

function Emp() {

	const title = "구성원";
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { emp } = useSelector(state => state.empReducer);
	const [searchOption, setSearchOption] = useState('name');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [allEmpList, setAllEmpList] = useState(false);
	const [selectdept, setSelectDept] = useState('');
	const [searchMode, setSearchMode] = useState(false);

	useEffect(
		() => {
			if (searchMode) {
				dispatch(empListSearchAPI({ searchOption, searchKeyword, currentPage }))
			} else if (!selectdept) {
				dispatch(callEmpListAPI({ currentPage }));
			} else {
				dispatch(empListDeptAPI({ deptCode: selectdept, currentPage }));
			}
		}, [currentPage, searchMode]
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
		setAllEmpList(true);
		setCurrentPage(1);
		setSearchMode(true);
	}

	/* Enter키 입력 시 검색화면으로 넘어가는 이벤트 */
	const onEnterKeyHandler = (e) => {
		if (e.key === 'Enter') {
			setAllEmpList(true);
			setCurrentPage(1);
			setSearchMode(true);
		}
	}

	/* 전체 조회 */
	const onEmpListHandler = (e) => {
		dispatch(callEmpListAPI({ currentPage }));
		setAllEmpList(true);
		setSelectDept('');
		setCurrentPage(1);
		setSearchMode(false);
		setSearchKeyword('');
	}


	/* 전체 조회 off */
	const onEmpOffHandler = (e) => {
		setAllEmpList(false);
	}

	/* 부서별 조회 */
	const EmpListDeptHandler = (e) => {
		dispatch(empListDeptAPI({ deptCode: e.target.getAttribute("name"), currentPage: 1 }));
		setSelectDept(e.target.getAttribute("name"))
		setAllEmpList(true);
		setCurrentPage(1);
		setSearchMode(false);
		setSearchKeyword('');
	}



	return (
		<>
			<Header title={title} />

			<div className="EmpWrapper">

				<div className="abs-menu-bar">
					<NavLink to="/emp">
						<div className="abs-menu"
						>
							조직도
						</div>
					</NavLink>

					{isAdmin().length > 0 ?
						<NavLink to="/emp/emprest">
							<div className="abs-menu" style={{ color: 'gray' }}>
								휴직관리
							</div>
						</NavLink>
					: ''}
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
						value={searchKeyword}
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
										{emp?.data && <EmpList empList={emp?.data} />}
									</li>
								</ul>

								<div className="EmpPaging">
									{emp?.pageInfo && <PagingBar pageInfo={emp?.pageInfo} setCurrentPage={setCurrentPage} />}
								</div>

							</li>
						) : null}
					</ul>
					{isAdmin().length > 0 ?
						<button
							className="EmpEntBtn"
							type="button"
							onClick={() => navigate('/emp/empregistration')}
						>
							+ 구성원 등록하기
						</button>
					: ''}
				</div>
				<div>
				</div>
			</div>
		</>
	)
}

export default Emp