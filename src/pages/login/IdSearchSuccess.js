import { useDispatch, useSelector } from "react-redux";
import "./IdSearchSuccess.css";
import { useNavigate } from "react-router-dom";
import { resetIdsearch } from "../../modules/LoginModule";

function IdSearchSuccess() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { idsearch } = useSelector(state => state.memberReducer);

	const onClickLogin = () => {
		navigate("/login")
		dispatch(resetIdsearch())
	}

	return (
		<div className="inner">
			<div>
				<img className="main-Img" src="/images/메인로고.png" alt="메인로고"></img>
			</div>
			<p className="idCheck">아이디 확인</p>
			<p className="idCheckScript">입력하신 정보와 일치하는 아이디는 다음과 같습니다.</p>
			<div className="checkID" id="checkID">{idsearch.data.empId}</div>
			<div className="bbttnn">
				<button id="loginBtn"
					onClick={ onClickLogin }
				>
				로그인 하기
			</button>
			<button id="pwBtn"
				onClick={ () => navigate("/pwsearch") }
			>
				비밀번호 찾기
			</button>
		</div>

			
		</div >
  );
}

export default IdSearchSuccess;