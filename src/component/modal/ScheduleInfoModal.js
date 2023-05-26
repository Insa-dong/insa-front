import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {callUpdateScheduleInfoAPI} from "../../apis/CalendarAPICalls";
import CSS from "./TrainingRegistModal.module.css";

function ScheduleInfoModal({info, modalOpen, setModalOpen}) {

	const [form, setForm] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log(info);

	const onChangeHandler = (e) => {
		setForm({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const onClickOutsideModal = (e) => {
		if (e.target === e.currentTarget) {
			setModalOpen(false);
		}
	};

	const onClickScheduleSaveHandler = () => {
		Swal.fire({
			text: '일정을 수정합니다.',
			icon: 'warning',
			showCancelButton: true,
			customClass: {
				confirmButton: 'custom-confirm-button',
				cancelButton: 'custom-cancel-button'
			},
			confirmButtonColor: '#8CBAFF',
			cancelButtonColor: '#DADADA',
			confirmButtonText: '수정',
			cancelButtonText: '취소',
			reverseButtons: true,
			buttonsStyling: false,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(callUpdateScheduleInfoAPI(form))
					.then(() => {
						Swal.fire({
							title: '수정 완료',
							text: '수정 완료.',
							icon: 'success',
							buttonsStyling: false,
							customClass: {
								confirmButton: 'custom-success-button'
							}
						}).then(() => {
							setModalOpen(false);
						});
					})
					.catch((error) => {
						Swal.fire(
							'수정 실패',
							'다시 시도하세요.',
							'error'
						);
					});
			}
		});
	}

	return (
		modalOpen && (
			<div className = {CSS.trainingModal} onClick = {onClickOutsideModal}>
				<div className = {CSS.trainingModalContainer}>
					<div className = {CSS.trainingModalClose} onClick = {() => setModalOpen(false)}>X</div>
					<div className = {CSS.trainingModalDiv}>

						<h1 className = {CSS.trainingModalTitle}>일정 조회</h1>

						<div className = {CSS.trainingField}>
							<h1>일정 명</h1>
							<input
								type = "text"
								className = {CSS.textInput}
								name = 'calTitle'
								onChange = {onChangeHandler}
								defaultValue = {info.calTitle}
							/>
						</div>
						<div className = {CSS.trainingField}>
							<h1>시작일</h1>
							<input
								type = "date"
								className = {CSS.textInput}
								name = 'calStartDate'
								onChange = {onChangeHandler}
								defaultValue = {info.calStartDate}
							/>
						</div>

						<div className = {CSS.trainingField}>
							<h1>종료일</h1>
							<input
								type = "date"
								className = {CSS.textInput}
								name = 'calEndDate'
								onChange = {onChangeHandler}
								defaultValue = {info.calEndDate}
							/>
						</div>
						<div className = {CSS.trainingField}>
							<h1>상세 내용</h1>
							<input
								type = "text"
								className = {CSS.textInput}
								name = 'calContent'
								onChange = {onChangeHandler}
								defaultValue = {info.calContent}
							/>
						</div>
						<div className = {CSS.trainingField}>
							<h1>색 지정하기</h1>
							<input
								type = "color"
								className = {CSS.textInput}
								defaultValue = {info.calColor}
							/>
						</div>

						<button onClick = {onClickScheduleSaveHandler}>저장</button>

					</div>
				</div>
			</div>
		)
	)
}

export default ScheduleInfoModal;