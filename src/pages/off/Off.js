import { NavLink, useParams } from 'react-router-dom';
import Header from "../../component/common/Header";
import './Off.css';

function Off() {

    return (
        <>
            <Header title="연차" />

            <div className="off-wrapp">
                <div className="off-menu-bar">
                    <NavLink to="/off">
                        <div className="abs-menu">
                            내 연차
                        </div>
                    </NavLink>

                    <NavLink to="/off/adminOff">
                        <div className="off-menu" style={{ color: 'gray' }}>
                            구성원 연차
                        </div>
                    </NavLink>
                </div>

            </div>
        </>
    )

};

export default Off;