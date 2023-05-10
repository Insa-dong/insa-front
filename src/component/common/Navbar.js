import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
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
                        <NavLink to="/">
                            <div className="sideTr">
                                <img className="notice-Img" src="./images/공지사항.png"></img><span>공지사항</span>
                            </div>
                        </NavLink>
                        <NavLink to="/">
                            <div className="sideTr">
                                <img className="attendance-Img" src="./images/근태.png"></img><span>근태</span>
                            </div>
                        </NavLink>
                        <NavLink to="/">
                        <div className="sideTr">
                            <img className="lecture-Img" src="./images/강의.png"></img><span>강의</span>
                        </div>
                        </NavLink>
                        <NavLink to="/">
                        <div className="sideTr">
                            <img className="curriculum-Img" src="./images/과정.png"></img><span>과정</span>
                        </div>
                        </NavLink>
                        <NavLink to="/">
                        <div className="sideTr">
                            <img className="member-Img" src="./images/구성원.png"></img><span>구성원</span>
                        </div>
                        </NavLink>
                        <NavLink to="/>">
                        <div className="sideTr">
                            <img className="student-Img" src="./images/수강생.png"></img><span>수강생</span>
                        </div>
                        </NavLink>
                        <NavLink to="/">
                        <div className="sideTr">
                            <img className="vacation-Img" src="./images/연차.png"></img><span>연차</span>
                        </div>
                        </NavLink>
                    </div>

                    <div id="sideBottom">
                        <div className="sideTr">
                            <span className="logout">로그아웃</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Navbar;

