import { NavLink } from 'react-router-dom';
import Header from "../../component/common/Header";
import './TeamAbs.css';


function TeamAbs() {


    return (
        <>
            <Header
                title="근태"
            />

            <div className="wrapp">

                <div className="abs-menu-bar">
                    <NavLink to="/abs" >
                        <div className="abs-menu" style = {{color: 'gray'}} >
                            내 근태
                        </div>
                    </NavLink>

                    <NavLink to="/abs/teamAbs" >
                        <div className="abs-menu">
                            구성원 근태
                        </div>
                    </NavLink>

                </div>

                <div className="abs-search-container">
                    <input className="abs-searchDate"
                        type="date"
                        name="selectDate"
                        
                    />
                    <button className="abs-absSearchBtn">
                        <img src="/images/search.png" alt="검색" />
                    </button>
                </div>

                <div className="team-abs-info">
                    <h2>구성원 근태 정보</h2>
                    {/* 여기에 구성원 근태에 관한 정보 또는 기능을 추가하세요. */}
                </div>
                


            </div>


        </>
    )
}

export default TeamAbs;