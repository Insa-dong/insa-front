import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('/main');
    }
    return (
        <div class="inner">
            <div>
                <img className="main-Img" src="./images/메인로고.png"></img>
            </div>
            <div class="borderID" id="borderID">
                <img className="id-Img" src="./images/아이디로고.png"></img>
                <input
                    type="text"
                    name="memberId"
                    placeholder="아이디"
                    autoComplete='off'
                    // onChange={ onChangeHandler }
                />
            </div>
            <div id="userpw">
                <img className="password-Img" src="./images/비밀번호로고.png"></img>
                <input
                    type="password"
                    name="memberPassword"
                    placeholder="비밀번호"
                    autoComplete='off'
                    
                />
                <div id="loginButton">

                    <button
                    onClick={onClickHandler}
                    >
                        로그인
                    </button>
                </div>


            </div>
        </div>
    );
}

export default Login;