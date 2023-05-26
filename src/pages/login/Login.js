import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callLoginAPI} from "../../apis/LoginAPICalls";
import {resetLogin} from "../../modules/LoginModule";
import './Login.css';


function Login() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {login} = useSelector(state => state.memberReducer);

	const [form, setForm] = useState({
		empId: '',
		empPwd: ''
	});

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	}

	const onClickHandler = () => {
		dispatch(callLoginAPI(form));
	}

	const handleEnter = (e) => {
		if (e.key === "Enter") {
			dispatch(callLoginAPI(form));
		}
	};

	useEffect(
		() => {
			if (login?.status === 200) {
				navigate("/", {replace: true})
				// dispatch(resetLogin());
			} else if (login?.state === 400) {
				alert(login.message);
				dispatch(resetLogin());
			}
		},
		[login]
	);


	return (
		<div className = "inner">
			<div>
				<img className = "main-Img" src = "/images/메인로고.png" alt = "메인로고"></img>
			</div>
			<div className = "borderID" id = "borderID">
				<img className = "id-Img" src = "/images/아이디로고.png" alt = "아이디로고"></img>
				<input className = "inputBox"
				       type = "text"
				       name = "empId"
				       placeholder = "아이디"
				       autoComplete = 'off'
				       onChange = {onChangeHandler}
				/>
			</div>
			<div className = "boderPW" id = "borderPW">
				<img className = "password-Img" src = "/images/비밀번호로고.png" alt = "비밀번호로고"></img>
				<input className = "inputBox"
				       type = "password"
				       name = "empPwd"
				       placeholder = "비밀번호"
				       autoComplete = 'off'
				       onChange = {onChangeHandler}
				       onKeyDown = {handleEnter}
				/>
			</div>
			<button id = "loginButton"
			        onClick = {onClickHandler}
			>
				로그인
			</button>
			<div>
				<button id = "idsearch" className = "searchButton"
				        onClick = {() => navigate("/idsearch")}
				>
					아이디찾기
				</button>

				<button id = "pwsearch" className = "searchButton"
				        onClick = {() => navigate("/pwsearch")}
				>
					비밀번호찾기
				</button>
			</div>


		</div>
	);
}

export default Login;