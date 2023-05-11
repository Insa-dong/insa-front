import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

	const style = { textDecoration : 'none', color : 'black'};
    const activeStyle = ({ isActive }) => isActive ? style : undefined;

	return (
		<>
			<div id="sideBar">
				<div id="sideTop" className="border-bottom">
					<div className="sideBox">
						<div id="prof"></div>
						<div className="sideTxt">
							<span className="topName">김영한</span>
							<span className="topAuth">행정팀 관리자</span>
						</div>
					</div>

					<div id="sideMiddle" className="border-bottom">
						<div>
							<NavLink to="/" style={activeStyle} className="sideTr">
								<img className="notice-Img" src="/images/공지사항.png"></img><span>공지사항</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/" style={activeStyle} className="sideTr">
								<img className="attendance-Img" src="/images/근태.png"></img><span>근태</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/training" style={activeStyle} className="sideTr">
								<img
									className="lecture-Img"
									alt="lecture-Img"
									src="/images/강의.png"
								></img><span>강의</span>
							</NavLink>
						</div>
						<div>
							<NavLink to='/class' style={activeStyle} className="sideTr">
								<img
									className="curriculum-Img"
									alt="curriculum-Img"
									src="/images/과정.png"
								></img><span>과정</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/emp" style={activeStyle} className="sideTr">
								<img className="member-Img" src="/images/구성원.png"></img><span>구성원</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/" style={activeStyle} className="sideTr">
								<img className="student-Img" src="/images/수강생.png"></img><span>수강생</span>
							</NavLink>
						</div>
						<div>
							<NavLink to="/" style={activeStyle} className="sideTr">
								<img className="vacation-Img" src="/images/연차.png"></img><span>연차</span>
							</NavLink>
						</div>
					</div>

					<div id="sideBottom">
						<div className="logoutBox">
							<span className="logout">로그아웃</span>
						</div>
					</div>
				</div>
			</div>
		</>

	);
}

export default Navbar;

