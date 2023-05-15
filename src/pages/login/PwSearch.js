import { useEffect, useState } from "react";
import { pwSearchAPI } from "../../apis/LoginAPICalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PwSearch() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pwsearch } = useSelector(state => state.memberReducer);

    const [form, setForm] = useState({
        empId : '',
        empEmail : ''
    });

    const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	}

    const onClickHandler = () => {
		dispatch(pwSearchAPI(form));
	}

    useEffect(
        () => {
            if (pwsearch?.status === 200) {
                navigate("/pwsearchsuccess")
            } else if(pwsearch?.state === 400) {
                alert(pwsearch.message)
            } else if(pwsearch?.status === 400){
                alert(pwsearch.message)
            }
        },
        [pwsearch]
    );
    

    return (
        <div className="inner">
            <div>
                <img className="main-Img" src="/images/메인로고.png" alt="메인로고"></img>
            </div>
            <p className="searchIdPW">비밀번호 찾기</p>
            <p className="searchScript">아이디와 이메일을 입력해주세요.</p>
            <div className="searchFirst" id="searchFirst">
                <input className="inputBox"
                    type="text"
                    name="empId"
                    placeholder="아이디"
                    autoComplete='off'
                    onChange={onChangeHandler}
                />
            </div>
            <div className="searchSecond" id="searchSecond">
                <input className="inputBox"
                    type="text"
                    name="empEmail"
                    placeholder="이메일"
                    autoComplete='off'
                    onChange={onChangeHandler}
                />
            </div>
            <button id="searchButton"
                onClick={onClickHandler}
            >
                비밀번호 찾기
            </button>
        </div>
    );
}

export default PwSearch;