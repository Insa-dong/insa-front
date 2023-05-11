import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {callModifyTraining, callTraining} from "../../apis/TrainingAPICalls";
import Header from "../../component/common/Header";
import CSS from "./TrainingDetail.module.css";

function TrainingDetail() {

	const title = '과정';
	const subTitle = '과정 조회';
	const dispatch = useDispatch();
	const {trainingCode} = useParams();
	const navigate = useNavigate();
	const [modifyMode, setModifyMode] = useState(false);
	const [form, setForm] = useState({});
	const data = useSelector(state => state.trainingReducer);
	const {modify} = useSelector(state => state.trainingReducer);


	useEffect(
		() => {
			dispatch(callTraining({trainingCode}));
		},
		[dispatch, trainingCode]
	);

	const onClickModifyHandler = (e) => {
		if (e.target.innerText === '수정하기') {
			setModifyMode(true);
			setForm({...data});
		} else if (e.target.innerText === '저장하기') {
			// const formData = new FormData();
			//
			// formData.append("trainingCode", form.trainingCode);
			// formData.append("trainingTitle", form.trainingTitle);
			// formData.append("trainingQual", form.trainingQual);
			// formData.append("trainingKnow", form.trainingKnow);
			// formData.append("trainingTime", form.trainingTime);
			// formData.append("trainingCount", form.trainingCount);
			// formData.append("trainingWriter", form.trainingWriter);
			// formData.append("trainingDate", form.trainingDate);
			// formData.append("trainingUpdate", form.trainingUpdate);
			// formData.append("trainingModifier", form.trainingModifier);

			console.log(form);
			dispatch(callModifyTraining(form));

			if (modify?.status === 200) {
				if (window.confirm('수정이 완료되었습니다. 목차로 이동합니다.')) {
					navigate('/training', {replace: true});
				} else {
					alert(`${modify}`);
				}
			}
		}
	}

	const onChangeHandler = (e) => {
		console.log(e.target);
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	return (
		<>
			<Header title = {title} subTitle = {subTitle}/>
			{data.trainingTime &&
				<table className = {CSS.tableStyle}>
					<tbody className = {CSS.tbodyStyle}>
					<tr>
						<th>과정명</th>
						<td>
							<textarea
								className = {!modifyMode ? CSS.textInput : CSS.textInput2}
								defaultValue = {!modifyMode ? data.trainingTitle || "" : form.trainingTitle}
								onChange = {onChangeHandler}
								readOnly = {!modifyMode}/>
						</td>
					</tr>
					<tr>
						<th>필요자격</th>
						<td>
							<textarea
								className = {!modifyMode ? CSS.specialTextInput : CSS.specialTextInput2}
								defaultValue = {!modifyMode ? data.trainingQual || "" : form.trainingQual}
								onChange = {onChangeHandler}
								readOnly = {!modifyMode}
							/>
						</td>
					</tr>
					<tr>
						<th>선수지식</th>
						<td>
							<textarea
								className = {!modifyMode ? CSS.textInput : CSS.textInput2}
								defaultValue = {!modifyMode ? data.trainingKnow || "" : form.trainingKnow}
								onChange = {onChangeHandler}
								readOnly = {!modifyMode}/>
						</td>
					</tr>
					<tr>
						<th>과정 시간</th>
						<td>
							<textarea
								className = {!modifyMode ? CSS.textInput : CSS.textInput2}
								defaultValue = {!modifyMode ? `총 ${data.trainingTime} 시간` || "" : form.trainingTime}
								onChange = {onChangeHandler}
								readOnly = {!modifyMode}/>
						</td>
					</tr>
					<tr>
						<th>현재 진행 회차</th>
						<td>
							<textarea
								className = {!modifyMode ? CSS.textInput : CSS.textInput2}
								defaultValue = {!modifyMode ? data.trainingCount || "" : form.trainingCount}
								onChange = {onChangeHandler}
								readOnly = {!modifyMode}/>
						</td>
					</tr>
					<tr>
						<th>작성자</th>
						{data.trainingWriter &&
							<td>
								<textarea
									className = {!modifyMode ? CSS.textInput : CSS.textInput2}
									defaultValue = {!modifyMode ? data.trainingWriter.empName || "" : form.trainingWriter.empName}
									onChange = {onChangeHandler}
									readOnly = {!modifyMode}/></td>
						}
					</tr>
					<tr>
						<th>작성 일</th>
						<td>
							<textarea
								className = {!modifyMode ? CSS.textInput : CSS.textInput2}
								defaultValue = {!modifyMode ? data.trainingDate || "" : form.trainingDate}
								onChange = {onChangeHandler}
								readOnly = {!modifyMode}/>
						</td>
					</tr>
					</tbody>
				</table>
			}
			<div className = {CSS.centerDiv}>
				<button className = {CSS.ButtonStyle2}
				        onClick = {onClickModifyHandler}>{!modifyMode ? '수정하기' : '저장하기'}
				</button>
				<button className = {CSS.ButtonStyle3} onClick = {() => navigate(-1)}>뒤로가기</button>
			</div>
		</>
	);
}

export default TrainingDetail;