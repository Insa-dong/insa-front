import Header from "../../component/common/Header";
import { NavLink } from 'react-router-dom';
import './Abs.css';

function Abs() {

    return (
        <>
            <Header
                title="근태"
            />

            <div className="wrapp">
                
                <div className="menu-bar">
                    <NavLink to="/">
                        <div className="menu">
                            내 근태
                        </div>
                    </NavLink>

                    <NavLink to="/">
                        <div className="menu">
                            구성원 근태
                        </div>
                    </NavLink>

                </div>
                <div className="abs-btns">
                    <button className="start-btn">출근하기</button>
                    <button className="end-btn">퇴근하기</button>
                </div>

                <div class="search-container">
                    <input className="searchDate"
                        type="date"
                        name="selectDate"
                        placeholder="출근일 검색"
                    />
                </div>


            </div>



        </>
    )
}

export default Abs;