import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {callTeacherList} from "../../apis/EmpAPICalls";
import {callModifyStudyInfo, callPetiteStudyInfoAPI} from "../../apis/StudyInfoAPICalls";
import {callTrainingTitle} from "../../apis/TrainingAPICalls";
import Header from "../../component/common/Header";
import CSS from "./StudyInfo.module.css";
import StudyTime from "./StudyTime";

function StudyInfo() {

	const title = '강의'
	const subTitle = '강의 조회';
	const dispatch = useDispatch();
	const {studyInfoCode} = useParams();
	const navigate = useNavigate();
	const [modifyMode, setModifyMode] = useState(false);
	const [form, setForm] = useState({});
	const studyInfo = useSelector(state => state.studyInfoReducer);
	const trainingList = useSelector(state => state.trainingReducer);
	const {teacher} = useSelector(state => state.empReducer);

	console.log('studyInfo : ', studyInfo);

	useEffect(
		() => {
			dispatch(callPetiteStudyInfoAPI(studyInfoCode));
		},
		[dispatch, studyInfoCode]
	)

	const onClickModifyHandler = (e) => {
		if (e.target.innerText === '수정하기') {
			setModifyMode(true);
			setForm({...studyInfo});
			dispatch(callTrainingTitle());
			dispatch(callTeacherList());
		} else if (e.target.innerText === '저장하기') {
			dispatch(callModifyStudyInfo({form, studyInfoCode}));
		}
	}

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const selectOnChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}


	return (
		<>
			<Header title = {title} subTitle = {subTitle}/>
			<div className = {CSS.HeaderDiv}>
				<h1>강의 정보</h1>
				<div className = {CSS.TopDiv}>
					<h2>강의 명</h2>
					<textarea
						className = {!modifyMode ? CSS.textInput : CSS.textInput2}
						name = 'studyInfo.studyTitle'
						defaultValue = {!modifyMode ? studyInfo && studyInfo.studyTitle : form.studyTitle}
						onChange = {onChangeHandler}
						readOnly = {!modifyMode}/>
					<h3>과정 명</h3>
					{!modifyMode ?
						<textarea
							className = {CSS.textInput}
							name = 'studyInfo.study.training.trainingTitle'
							defaultValue = {studyInfo.study && studyInfo.study.training.trainingTitle}
							onChange = {onChangeHandler}
							readOnly = {!modifyMode}/>
						: <select onChange = {selectOnChangeHandler} className = {CSS.selectBox}
						          name = {studyInfo.study.training.trainingTitle}
						>
							<option
								value = {studyInfo.study.training.trainingCode}>{studyInfo.study.training.trainingTitle}
							</option>
							{trainingList && trainingList.map(training =>
								studyInfo.study.training.trainingCode !== training.trainingCode &&
								<option
									value = {training.trainingCode}
									key = {training.trainingCode}
								>{training.trainingTitle}
								</option>)}
						</select>
					}
				</div>
				<h1>상세 정보</h1>
				<table className = {CSS.MiddleBody}>
					<tbody>
					<tr>
						<th>강의실</th>
						<td colSpan = {3} className = {CSS.MiddleBodyDiv}>
							<textarea
								className = {!modifyMode ? CSS.textInput3 : CSS.textInput4}
								name = 'studyInfo.studyRoom'
								defaultValue = {studyInfo && studyInfo.studyRoom}
								onChange = {onChangeHandler}
								readOnly = {!modifyMode}/>
						</td>
					</tr>
					<tr>
						<th>담당 강사, 회차</th>
						<td colSpan = {1} className = {CSS.MiddleBodyDiv}>
							{!modifyMode ?
								<textarea
									className = {!modifyMode ? CSS.textInput3 : CSS.textInput4}
									name = 'studyInfo.teacher.empName'
									defaultValue = {studyInfo.teacher && studyInfo.teacher.empName}
									onChange = {onChangeHandler}
									readOnly = {!modifyMode}/>
								:
								<select onChange = {selectOnChangeHandler} className = {CSS.selectBox}
								        name = 'studyInfo.teacher.empName'
								>
									<option
										value = {studyInfo.teacher.empCode}>{studyInfo.teacher.empName}
									</option>
									{teacher && teacher.map(name =>
										studyInfo.teacher.empName !== name.empName &&
										<option
											value = {name.empCode}
											key = {name.empCode}
										>{name.empName}
										</option>)}
								</select>
							}
						</td>
						<td colSpan = {1} className = {CSS.MiddleBodyDiv}>
							<textarea
								className = {!modifyMode ? CSS.textInput3 : CSS.textInput4}
								name = 'studyInfo.study.training.trainingCount'
								defaultValue = {studyInfo.study && `${studyInfo.study.training.trainingCount} 회차`}
								onChange = {onChangeHandler}
								readOnly = {!modifyMode}/>
						</td>
					</tr>
					<tr>
						<th>강의 내용 및 특징</th>
						<td className = {CSS.MiddleBody2} colSpan = {3}>
							<textarea
								className = {!modifyMode ? CSS.textInput5 : CSS.textInput6}
								name = 'studyInfo.studyContent'
								defaultValue = {studyInfo && studyInfo.studyContent}
								onChange = {onChangeHandler}
								readOnly = {!modifyMode}/>
						</td>
					</tr>
					</tbody>
				</table>
				<h1>일정</h1>
				<table className = {CSS.MiddleBody}>
					<tbody>
					<tr>
						<th className = {CSS.MiddleTh}>시작일</th>
						<td className = {CSS.MiddleTd}>
							{!modifyMode ?
								<textarea
									className = {CSS.textInput5}
									name = 'studyInfo.study.studyStartDate'
									defaultValue = {studyInfo.study && studyInfo.studyInfoStartDate}
									onChange = {onChangeHandler}
									readOnly = {modifyMode}/>
								: <input
									type = "date"
									className = {CSS.textInput5}
									name = 'studyInfoStartDate'
									defaultValue = {!modifyMode ? studyInfo.study && studyInfo.studyStartDate : form.studyInfoStartDate}
									onChange = {onChangeHandler}
									max = {form.studyEndDate}
									readOnly = {!modifyMode}/>
							}
						</td>
					</tr>
					<tr>
						<th className = {CSS.MiddleTh}>종료일</th>
						<td className = {CSS.MiddleTd}>
							{!modifyMode ?
								<textarea
									className = {CSS.textInput5}
									name = 'studyInfo.study.studyEndDate'
									defaultValue = {studyInfo.study && studyInfo.studyInfoEndDate}
									onChange = {onChangeHandler}
									readOnly = {modifyMode}/>
								: <input
									type = "date"
									className = {CSS.textInput5}
									name = 'studyInfoEndDate'
									defaultValue = {!modifyMode ? studyInfo.study && studyInfo.studyInfoEndDate : form.studyInfoEndDate}
									min = {form.studyStartDate}
									onChange = {onChangeHandler}
									readOnly = {!modifyMode}/>
							}
						</td>
					</tr>
					<tr>
						<td className = {CSS.BottomTd} colSpan = {3}>
							<StudyTime studyTimes = {studyInfo.study && studyInfo.study.studyTimes}
							           readOnly = {!modifyMode}/>
						</td>
					</tr>
					</tbody>
				</table>
				<div className = {CSS.centerDiv}>
					<button className = {CSS.ButtonStyle2}
					        onClick = {onClickModifyHandler}>{!modifyMode ? '수정하기' : '저장하기'}
					</button>
					<button className = {CSS.ButtonStyle3} onClick = {() => navigate(-1)}>뒤로가기</button>
				</div>
			</div>
		</>
	);
}

export default StudyInfo;