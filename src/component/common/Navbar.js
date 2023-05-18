import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

	const { login } = useSelector(state => state.memberReducer);

	const style = { textDecoration: 'none', color: 'black' };
	const activeStyle = ({ isActive }) => isActive ? style : undefined;
	const navigate = useNavigate();

	const onClickLogoutHandler = () => {
		window.localStorage.removeItem('accessToken');
		alert('로그아웃 되었습니다.')
		navigate('/login', { replace: true });
	}

	return (
		<>
			<div id="sideBar">
				<div id="sideTop" className="border-bottom">
					<div className="sideBox">
						<NavLink to="/">
							<div id="prof"></div>
						</NavLink>
						<div className="sideTxt">
							<span className="topName">김영한</span>
							<span className="topAuth">행정팀 관리자</span>
						</div>
					</div>

					<div id="sideMiddle" className="border-bottom">
						<div>
							<NavLink to="/board" style={activeStyle} className="sideTr">
								<img className="notice-Img" src="/images/공지사항.png"></img><span>공지사항</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/abs" style={activeStyle} className="sideTr">
								<img className="attendance-Img" src="/images/근태.png"
									alt="근태"></img>
								<span>근태</span>
							</NavLink>
						</div>
						<div>
							<NavLink to='/training' style={activeStyle} className="sideTr">
								<img
									className="curriculum-Img"
									alt="curriculum-Img"
									src="/images/과정.png"
								></img><span>과정</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/study" style={activeStyle} className="sideTr">
								<img
									className="lecture-Img"
									alt="lecture-Img"
									src="/images/강의.png"
								></img><span>강의</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/emp" style={activeStyle} className="sideTr">
								<img className="member-Img" src="/images/구성원.png"></img><span>구성원</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/student" style={activeStyle} className="sideTr">
								<img className="student-Img" src="/images/수강생.png"></img><span>수강생</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/off" style={activeStyle} className="sideTr">
								<img className="vacation-Img" src="/images/연차.png"></img><span>연차</span>
							</NavLink>
						</div>
					</div>

					<div id="sideBottom">
						<div
							className="logoutBox"
							onClick={onClickLogoutHandler}
						>
							<button className="logout">로그아웃</button>
						</div>
					</div>
				</div>
			</div>
		</>

	);
}

export default Navbar;

