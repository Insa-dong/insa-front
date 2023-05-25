import { NavLink, useParams } from 'react-router-dom';
import Header from "../../component/common/Header";
import './AdminOff.css';

function AdminOff() {

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
                    <NavLink to="/off/adminOff" activeClassName="active-link">
                        <div className="admin-off-menu"  >
                            연차 현황
                        </div>
                    </NavLink>

                    <NavLink to="/off/adminOff/offSign" activeClassName="active-link" style={{ color: 'gray' }}>
                        <div className="admin-off-menu" >
                            연차 신청내역
                        </div>
                    </NavLink>
                </div>

            </div>
        </>
    )

};

export default AdminOff;