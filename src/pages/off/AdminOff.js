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
                        <div className="abs-menu" style={{ color: 'gray' }} >
                            내 연차
                        </div>
                    </NavLink>

                    <NavLink to="/adminOff">
                        <div className="off-menu" >
                            구성원 연차
                        </div>
                    </NavLink>
                </div>

            </div>
        </>
    )

};

export default AdminOff;