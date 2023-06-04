import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {callTrainingRemoveAPI} from "../../apis/TrainingAPICalls";
import CSS from "./TrainingRegistModal.module.css";

function TrainingDeleteModal({isDeleteModalOpen, setIsDeleteModalOpen, setInsert, checkValue, setCheckValue}) {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onClickOutsideModal = (e) => {
		if (e.target === e.currentTarget) {
			setIsDeleteModalOpen(false);
		}
	};

	const onClickTrainingDeleteHandler = () => {
		if (checkValue.length > 0) {
			Swal.fire({
				text: `${checkValue}번 과정을 삭제하시겠습니까?`,
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
					dispatch(callTrainingRemoveAPI(checkValue))
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
								navigate('/training', {replace: true});
								setIsDeleteModalOpen(false);
								setInsert(true);
								setCheckValue([]);
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
					setCheckValue([]);
				}
			});
		} else {
			Swal.fire({
				text: `삭제할 과목을 선택해주세요.`,
				icon: 'warning',
				showCancelButton: true,
				customClass: {
					confirmButton: 'custom-confirm-button',
					cancelButton: 'custom-cancel-button'
				},
				confirmButtonColor: '#8CBAFF',
				cancelButtonColor: '#DADADA',
				confirmButtonText: '확인',
				cancelButtonText: '취소',
				reverseButtons: true,
				buttonsStyling: false,
			}).then(result => {
				setIsDeleteModalOpen(false);
				setCheckValue([]);
			})
		}
	};

	return (
		isDeleteModalOpen && (
			<div className = {CSS.trainingModal} onClick = {onClickOutsideModal}>
				{onClickTrainingDeleteHandler()}
			</div>
		)
	)
}

export default TrainingDeleteModal;