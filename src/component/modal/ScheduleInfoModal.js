import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {callUpdateScheduleAPI} from "../../apis/CalendarAPICalls";
import CSS from "./TrainingRegistModal.module.css";

function ScheduleInfoModal({info, modalOpen, setModalOpen}) {

	const [form, setForm] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log('info', info);

	const onChangeHandler = (e) => {
		setForm({
			...form,
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
				dispatch(callUpdateScheduleAPI(form))
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
							navigate('/', {replace: true});
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

						<h1 className = {CSS.trainingModalTitle}>과정 등록</h1>

						<div className = {CSS.trainingField}>
							<h1>과정 명</h1>
							<input
								type = "text"
								className = {CSS.textInput}
								name = 'trainingTitle'
								onChange = {onChangeHandler}
							/>
						</div>
						<div className = {CSS.trainingField}>
							<h1>필요자격</h1>
							<input
								type = "text"
								className = {CSS.textInput}
								name = 'trainingQual'
								onChange = {onChangeHandler}
							/>
						</div>

						<div className = {CSS.trainingField}>
							<h1>선수지식</h1>
							<input
								type = "text"
								className = {CSS.textInput}
								name = 'trainingKnow'
								onChange = {onChangeHandler}
							/>
						</div>


						<div className = {CSS.trainingField}>
							<h1>과정 시간</h1>
							<input
								type = "number"
								className = {CSS.textInput}
								name = 'trainingTime'
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

export default ScheduleInfoModal;