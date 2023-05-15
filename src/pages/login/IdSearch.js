import { useEffect, useState } from "react";
import { idSearchAPI } from "../../apis/LoginAPICalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./IdSearch.css";

function IdSearch() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { idsearch } = useSelector(state => state.memberReducer);

	const [form, setForm] = useState({
		empName : '',
		empPhone : ''
	});

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	}

	const onClickHandler = () => {
		dispatch(idSearchAPI(form));
	}

	useEffect(
		() => {
			if (idsearch?.status === 200) {
				navigate("/idsearchsuccess")
			} else if (idsearch?.state === 400) {
				alert(idsearch.message);
			}
		},
		[idsearch]
	);

  return (
    <div className="inner">
			<div>
				<img className="main-Img" src="/images/메인로고.png" alt="메인로고"></img>
			</div>
            <p className="searchId">아이디 찾기</p>
            <p className="searchScript">이름과 전화번호를 입력해주세요.</p>
			<div className="searchName" id="searchName">
				<input className="inputBox"
					type="text"
					name="empName"
					placeholder="이름"
					autoComplete='off'
					onChange={ onChangeHandler }
				/>
			</div>
			<div className="searchPhone" id="searchPhone">
				<input className="inputBox"
					type="text"
					name="empPhone"
					placeholder="전화번호"
					autoComplete='off'
					onChange={ onChangeHandler }
				/>
			</div>
			<button id="searchButton"
					onClick={onClickHandler}
				>
					아이디 찾기
			</button>

			
		</div>
  );
}
export default IdSearch;