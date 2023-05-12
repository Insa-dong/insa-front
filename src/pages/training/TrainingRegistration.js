import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callTrainingRegisterAPI} from "../../apis/TrainingAPICalls";
import Header from "../../component/common/Header";
import CSS from "./TrainingRegistration.module.css";

function TrainingRegistration() {

	const title = '과정';
	const subTitle = '과정 등록';
	const [form, setForm] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {regist} = useSelector(state => state.trainingReducer);

	useEffect(
		() => {
			if (regist?.state === 200) {
				if (window.confirm('등록이 완료되었습니다. 메인 페이지로 이동합니다.')) {
					navigate('/training', {replace: true});
				} else {
					alert('메인 페이지로 이동합니다.');
					navigate('training', {replace: true});
				}
			}
		},
		[regist]
	)

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
		console.log(form);
	}

	const onClickSaveHandler = () => {
		dispatch(callTrainingRegisterAPI(form))
	}

	return (
		<>
			<Header title = {title} subTitle = {subTitle}/>
			<table className = {CSS.tableStyle}>
				<tbody>
				<tr>
					<th>과정명</th>
					<td>
							<textarea
								className = {CSS.textInput}
								name = 'trainingTitle'
								onChange = {onChangeHandler}
							/>
					</td>
				</tr>
				<tr>
					<th>필요자격</th>
					<td>
							<textarea
								className = {CSS.specialTextInput}
								name = 'trainingQual'
								onChange = {onChangeHandler}
							/>
					</td>
				</tr>
				<tr>
					<th>선수지식</th>
					<td>
							<textarea
								className = {CSS.textInput}
								name = 'trainingKnow'
								onChange = {onChangeHandler}
							/>
					</td>
				</tr>
				<tr>
					<th>과정 시간</th>
					<td>
							<textarea
								className = {CSS.textInput}
								name = 'trainingTime'
								onChange = {onChangeHandler}
							/>
					</td>
				</tr>
				</tbody>
			</table>
			<div className = {CSS.centerDiv}>
				<button className = {CSS.ButtonStyle2}
				        onClick = {onClickSaveHandler}
				>
					저장하기
				</button>
				<button className = {CSS.ButtonStyle3} onClick = {() => navigate(-1)}>뒤로가기</button>
			</div>
		</>
	);
}

export default TrainingRegistration;