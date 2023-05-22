import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callTeacherList} from "../../apis/EmpAPICalls";
import {callInsertStudyInfo} from "../../apis/StudyInfoAPICalls";
import {callTrainingTitle} from "../../apis/TrainingAPICalls";
import Header from "../../component/common/Header";
import InsertStudyTime from "./InsertStudyTime";
import CSS from "./StudyInfo.module.css";

function StudyRegistration() {

	const title = '강의';
	const subTitle = '강의 등록';
	const [form, setForm] = useState({});
	const [day, setDay] = useState([]);
	const trainingList = useSelector(state => state.trainingReducer);
	const {teacher} = useSelector(state => state.empReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(
		() => {
			dispatch(callTrainingTitle());
			dispatch(callTeacherList());
		},
		[dispatch]
	)

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const onClickInsertHandler = () => {
		dispatch(callInsertStudyInfo({form, day}));
	}

	return (
		<>
			<Header title = {title} subTitle = {subTitle}/>
			<div className = {CSS.HeaderDiv}>
				<h1>강의 정보</h1>
				<div className = {CSS.TopDiv}>
					<h2>강의 명</h2>
					<textarea
						className = {CSS.textInput}
						onChange = {onChangeHandler}
						name = 'studyTitle'
					/>
					<h3>과정 명</h3>
					<select onChange = {onChangeHandler} className = {CSS.selectBox}
					        name = 'trainingCode'>
						{trainingList && trainingList.map(training =>
							<option
								value = {training.trainingCode}
								key = {training.trainingCode}
							>{training.trainingTitle}
							</option>)}
					</select>
				</div>
				<h1>상세 정보</h1>
				<table className = {CSS.MiddleBody}>
					<tbody>
					<tr>
						<th>강의실</th>
						<td colSpan = {3} className = {CSS.MiddleBodyDiv}>
							<input
								type = "number"
								className = {CSS.textInput4}
								name = 'studyRoom'
								onChange = {onChangeHandler}/>
						</td>
					</tr>
					<tr>
						<th>담당 강사, 회차, 정원</th>
						<td colSpan = {1} className = {CSS.MiddleBodyDiv}>
							<select onChange = {onChangeHandler} className = {CSS.selectBox}
							        name = 'empCode'
							>
								{teacher && teacher.map(name =>
									<option
										value = {name.empCode}
										key = {name.empCode}
									>{name.empName}
									</option>)}
							</select>
						</td>
						<td colSpan = {1} className = {CSS.MiddleBodyDiv}>
							<input
								type = "number"
								className = {CSS.textInput4}
								name = 'studyCount'
								onChange = {onChangeHandler}/>
						</td>
						<td colSpan = {1} className = {CSS.MiddleBodyDiv}>
							<input
								type = "number"
								className = {CSS.textInput4}
								name = 'studyMaxPeople'
								onChange = {onChangeHandler}/>
						</td>
					</tr>
					<tr>
						<th>강의 내용 및 특징</th>
						<td className = {CSS.MiddleBody2} colSpan = {3}>
							<textarea
								className = {CSS.textInput6}
								name = 'studyContent'
								onChange = {onChangeHandler}/>
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
							<input
								type = "date"
								className = {CSS.textInput5}
								name = 'studyInfoStartDate'
								onChange = {onChangeHandler}
								max = {form.studyEndDate}/>
						</td>
					</tr>
					<tr>
						<th className = {CSS.MiddleTh}>종료일</th>
						<td className = {CSS.MiddleTd}>
							<input
								type = "date"
								className = {CSS.textInput5}
								name = 'studyInfoEndDate'
								min = {form.studyStartDate}
								onChange = {onChangeHandler}/>
						</td>
					</tr>
					<tr>
						<td className = {CSS.BottomTd} colSpan = {3}>
							<span className = {CSS.BottomSpan}>수업 시작</span>
							<span className = {CSS.BottomSpan2}>수업 종료</span>
							<InsertStudyTime form = {form}
							                 day = {day}
							                 setDay = {setDay}
							/>
						</td>
					</tr>
					</tbody>
				</table>
				<div className = {CSS.centerDiv}>
					<button className = {CSS.ButtonStyle2}
					        onClick = {onClickInsertHandler}>{'저장하기'}
					</button>
					<button className = {CSS.ButtonStyle3} onClick = {() => navigate(-1)}>뒤로가기</button>
				</div>
			</div>
		</>
	);

}

export default StudyRegistration;