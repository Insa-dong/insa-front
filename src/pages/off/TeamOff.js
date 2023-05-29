import { NavLink, useParams } from 'react-router-dom';
import Header from "../../component/common/Header";
import './TeamOff.css';

function TeamOff() {

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

                    <NavLink to="/off/teamOff/offSign" className="active-link" style={{ color: 'gray' }}>
                        <div className="team-off-menu" >
                            연차 신청내역
                        </div>
                    </NavLink>
                </div>

            </div>
        </>
    )

};

export default TeamOff;