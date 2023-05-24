import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {callMyCalListAPI, callUpdateScheduleAPI} from "../../apis/CalendarAPICalls";

function ModifyButton({isRegistOpen, setIsRegistOpen}) {

	const scheduleList = useSelector(state => state.buttonReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log(scheduleList)

	useEffect(
		() => {
			dispatch(callUpdateScheduleAPI(scheduleList));
		}, [dispatch, scheduleList]
	)

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
				dispatch(callMyCalListAPI())
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
							setIsRegistOpen(false);
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
		<>
			{scheduleList && scheduleList.length > 0 &&
				<button onClick = {onClickScheduleSaveHandler}>변경사항 저장하기</button>}
		</>
	)
}

export default ModifyButton;