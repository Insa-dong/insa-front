import {useState} from "react";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import {callInsertScheduleAPI} from "../../apis/CalendarAPICalls";
import CSS from "./TrainingRegistModal.module.css";

function ScheduleRegistModal({registModalOpen, setRegistModalOpen}) {

	const [form, setForm] = useState({});
	const dispatch = useDispatch();

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const onClickOutsideModal = (e) => {
		if (e.target === e.currentTarget) {
			setRegistModalOpen(false);
		}
	};

	const onClickScheduleSaveHandler = () => {
		Swal.fire({
			text: '새 일정을 등록합니다.',
			icon: 'warning',
			showCancelButton: true,
			customClass: {
				confirmButton: 'custom-confirm-button',
				cancelButton: 'custom-cancel-button'
			},
			confirmButtonColor: '#8CBAFF',
			cancelButtonColor: '#DADADA',
			confirmButtonText: '저장',
			cancelButtonText: '취소',
			reverseButtons: true,
			buttonsStyling: false,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(callInsertScheduleAPI(form))
					.then(() => {
						Swal.fire({
							title: '저장 완료',
							text: '저장이 완료되었습니다 !',
							icon: 'success',
							buttonsStyling: false,
							customClass: {
								confirmButton: 'custom-success-button'
							}
						}).then(() => {
							setRegistModalOpen(false);
						});
					})
					.catch((error) => {
						Swal.fire(
							'저장 실패',
							'다시 시도하세요.',
							'error'
						);
					});
			}
		});
	};

	return (
		registModalOpen && (
			<div className = {CSS.trainingModal} onClick = {onClickOutsideModal}>
				<div className = {CSS.trainingModalContainer}>
					<div className = {CSS.trainingModalClose} onClick = {() => setRegistModalOpen(false)}>X</div>
					<div className = {CSS.trainingModalDiv}>

						<h1 className = {CSS.trainingModalTitle}>일정 추가</h1>

						<div className = {CSS.trainingField}>
							<h1>일정 명</h1>
							<input
								type = "text"
								className = {CSS.textInput}
								name = 'calTitle'
								onChange = {onChangeHandler}
							/>
						</div>
						<div className = {CSS.trainingField}>
							<h1>시작일</h1>
							<input
								type = "date"
								className = {CSS.textInput}
								name = 'calStartDate'
								onChange = {onChangeHandler}
							/>
						</div>

						<div className = {CSS.trainingField}>
							<h1>종료일</h1>
							<input
								type = "date"
								className = {CSS.textInput}
								name = 'calEndDate'
								onChange = {onChangeHandler}
							/>
						</div>
						<div className = {CSS.trainingField}>
							<h1>코멘트</h1>
							<input
								type = "text"
								className = {CSS.textInput}
								name = 'calContent'
								onChange = {onChangeHandler}
							/>
						</div>
						<div className = {CSS.trainingField}>
							<h1>색 지정하기</h1>
							<input
								type = "color"
								name = 'calColor'
								className = {CSS.textInput}
								onChange = {onChangeHandler}
							/>
						</div>
						<button onClick = {onClickScheduleSaveHandler}>저장</button>
					</div>
				</div>
			</div>
		)
	)
}


export default ScheduleRegistModal;