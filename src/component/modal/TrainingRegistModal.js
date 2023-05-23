import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {callTrainingRegisterAPI} from "../../apis/TrainingAPICalls";
import CSS from "./TrainingRegistModal.module.css";

function TrainingRegistModal({isRegistOpen, setIsRegistOpen, setInsert}) {

	const [form, setForm] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const onClickOutsideModal = (e) => {
		if (e.target === e.currentTarget) {
			setIsRegistOpen(false);
		}
	};

	const onClickTrainingSaveHandler = () => {
		Swal.fire({
			text: '새 강좌를 등록합니다.',
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
				dispatch(callTrainingRegisterAPI(form)).then(() => {
					Swal.fire({
						title: '저장 완료',
						text: '저장 완료. 메인 페이지로 이동합니다.',
						icon: 'success',
						buttonsStyling: false,
						customClass: {
							confirmButton: 'custom-success-button'
						}
					}).then(() => {
						navigate('/training', {replace: true});
						setIsRegistOpen(false);
						setInsert(true);
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
		isRegistOpen && (
			<div className = {CSS.trainingModal} onClick = {onClickOutsideModal}>
				<div className = {CSS.trainingModalContainer}>
					<div className = {CSS.trainingModalClose} onClick = {() => setIsRegistOpen(false)}>X</div>
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

						<button onClick = {onClickTrainingSaveHandler}>저장</button>

					</div>
				</div>
			</div>
		)
	)
}

export default TrainingRegistModal;