import { useNavigate } from "react-router-dom"

function PwSearchSuccess() {

    const navigate = useNavigate();

    return (
        <div className="inner">
            <div>
                <img className="main-Img" src="/images/메인로고.png" alt="메인로고"></img>
            </div>
            <p className="pwCheck">비밀번호 확인</p>
            <p className="pwCheckScript">입력하신 이메일주소로 임시비밀번호를 발송했습니다<br />이메일을 확인해주세요</p>
            <button id="loginBtn"
                onClick={() => navigate("/login")}
            >
                로그인 하기
            </button>



        </div >
    );
}

export default PwSearchSuccess;