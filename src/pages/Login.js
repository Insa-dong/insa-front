import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {

	const navigate = useNavigate();

	const onClickHandler = () => {
		navigate('/main');
	}
	return (
		<div className="inner">
			<div>
				<img className="main-Img" src="/images/메인로고.png" alt="메인로고"></img>
			</div>
			<div className="borderID" id="borderID">
				<img className="id-Img" src="/images/아이디로고.png" alt="아이디로고"></img>
				<input className="inputBox"
					type="text"
					name="memberId"
					placeholder="아이디"
					autoComplete='off'
				// onChange={ onChangeHandler }
				/>
			</div>
			<div className="boderPW" id="borderPW">
				<img className="password-Img" src="/images/비밀번호로고.png" alt="비밀번호로고"></img>
				<input className="inputBox"
					type="password"
					name="memberPassword"
					placeholder="비밀번호"
					autoComplete='off'
				/>

				



			</div>
			<button id="loginButton"
					onClick={onClickHandler}
				>
					로그인
			</button>
			<div>
			<button id="idsearch" className="searchButton"
					onClick={onClickHandler}
				>
					아이디찾기
			</button>

			<button id="pwsearch" className="searchButton"
					onClick={onClickHandler}
				>
					비밀번호찾기
			</button>
			</div>

			
		</div>
	);
}

export default Login;