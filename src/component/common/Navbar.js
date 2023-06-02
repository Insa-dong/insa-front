import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import './Navbar.css';
import { useEffect } from 'react';
import { callMypageAPI } from '../../apis/MpgAPICalls';

function Navbar() {

	const { info } = useSelector(state => state.mypageReducer);
	
	const style = {textDecoration: 'none', color: 'black'};
	const activeStyle = ({isActive}) => isActive ? style : undefined;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log(info?.dept.deptCode)
	useEffect(() =>{
			dispatch(callMypageAPI());
		},[]
	)

	const onClickLogoutHandler = () => {
		window.localStorage.removeItem('accessToken');
		Swal.fire({
			text: '로그아웃 하시겠습니까?',
			icon: 'warning',
			showCancelButton: true,
			customClass: {
				confirmButton: 'custom-confirm-button',
				cancelButton: 'custom-cancel-button'
			},
			confirmButtonColor: '#8CBAFF',
			cancelButtonColor: '#DADADA',
			confirmButtonText: '확인',
			cancelButtonText: '취소',
			reverseButtons: true,
			buttonsStyling: false,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: '로그아웃 완료',
					//   text: '안녕히가세요',
					icon: 'success',
					buttonsStyling: false,
					customClass: {
						confirmButton: 'custom-success-button'
					}
				})
					.then(() => {
						window.location.reload('/login');
					})
					.catch((error) => {
						Swal.fire(
							'저장 실패',
							'다시 시도하세요.',
							'error'
						);
					});
			}
		});
	};

	return (
		<>
			<div id = "sideBar">
				<div id = "sideTop" className = "border-bottom">
					<NavLink to = "/">
						<img src = "/images/mainTITLE.png" className = "moreThanus"></img>
					</NavLink>
					<div className = "sideBox">
						<NavLink to = "/mypage">
							<div id = "prof" className={info?.dept.deptCode}>{info?.empName.slice(-2)}</div>
						</NavLink>
						<div className = "sideTxt">
							<span className = "topName">{info?.empName}</span>
							<span className = "topAuth">{info?.dept.deptName}팀·</span>
							<span className = "topAuth">{info?.job.jobName}</span>
						</div>
					</div>

					<div id = "sideMiddle" className = "border-bottom">
						<div>
							<NavLink to = "/board" style = {activeStyle} className = "sideTr">
								<img className = "notice-Img" src = "/images/공지사항.png"></img><span
								className = 'sideBoard'>공지사항</span>
							</NavLink>
						</div>
						<div>
							<NavLink to = "/abs" style = {activeStyle} className = "sideTr">
								<img className = "attendance-Img" src = "/images/근태.png"
								     alt = "근태"></img>
								<span>근태</span>
							</NavLink>
						</div>
						<div>
							<NavLink to = '/training' style = {activeStyle} className = "sideTr">
								<img
									className = "curriculum-Img"
									alt = "curriculum-Img"
									src = "/images/과정.png"
								></img><span>과정</span>
							</NavLink>
						</div>
						<div>
							<NavLink to = "/study" style = {activeStyle} className = "sideTr">
								<img
									className = "lecture-Img"
									alt = "lecture-Img"
									src = "/images/강의.png"
								></img><span>강의</span>
							</NavLink>
						</div>
						<div>
							<NavLink to = "/emp" style = {activeStyle} className = "sideTr">
								<img className = "member-Img" src = "/images/구성원.png"></img><span
								className = 'sideMember'>구성원</span>
							</NavLink>
						</div>
						<div>
							<NavLink to = "/student" style = {activeStyle} className = "sideTr">
								<img className = "student-Img" src = "/images/수강생.png"></img><span
								className = 'sideStudent'>수강생</span>
							</NavLink>
						</div>
						<div>
							<NavLink to = "/off" style = {activeStyle} className = "sideTr">
								<img className = "vacation-Img" src = "/images/연차.png"></img><span
								className = 'sideVacation'>연차</span>
							</NavLink>
						</div>
						<div>
							<NavLink to = "/cal" style = {activeStyle} className = "sideTr">
								<img className = "vacation-Img" src = "/images/calendar-day-fill.svg"
								     alt = "vacation-Img"></img><span
								className = 'sideVacation'>일정</span>
							</NavLink>
						</div>
					</div>

					<div id = "sideBottom">
						<div
							className = "logoutBox"
							onClick = {onClickLogoutHandler}
						>
							<button className = "logout">로그아웃</button>
						</div>
					</div>
				</div>
			</div>
		</>

	);
}

export default Navbar;

