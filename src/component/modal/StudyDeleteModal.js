import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {callStudyRemoveAPI} from "../../apis/StudyInfoAPICalls";
import CSS from "./TrainingRegistModal.module.css";

function StudyDeleteModal({isDeleteModalOpen, setIsDeleteModalOpen, setInsert, checkValue,}) {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onClickOutsideModal = (e) => {
		if (e.target === e.currentTarget) {
			setIsDeleteModalOpen(false);
		}
	};

	const onClickTrainingDeleteHandler = () => {
		Swal.fire({
			text: `${checkValue}번 강의를 삭제하시겠습니까?`,
			icon: 'warning',
			showCancelButton: true,
			customClass: {
				confirmButton: 'custom-confirm-button',
				cancelButton: 'custom-cancel-button'
			},
			confirmButtonColor: '#8CBAFF',
			cancelButtonColor: '#DADADA',
			confirmButtonText: '삭제',
			cancelButtonText: '취소',
			reverseButtons: true,
			buttonsStyling: false,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(callStudyRemoveAPI(checkValue))
					.then(() => {
						Swal.fire({
							title: '삭제 완료',
							text: '삭제 완료. 메인 페이지로 이동합니다.',
							icon: 'success',
							buttonsStyling: false,
							customClass: {
								confirmButton: 'custom-success-button'
							}
						}).then(() => {
							navigate('/study', {replace: true});
							setIsDeleteModalOpen(false);
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
			} else if (result.dismiss) {
				setIsDeleteModalOpen(false);
			}
		});
	};

	return (
		isDeleteModalOpen && (
			<div className = {CSS.trainingModal} onClick = {onClickOutsideModal}>
				{onClickTrainingDeleteHandler()}
			</div>
		)
	)
}

export default StudyDeleteModal;