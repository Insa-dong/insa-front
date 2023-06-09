import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {callUpdateScheduleAPI} from "../../apis/CalendarAPICalls";
import {initCalList} from "../../modules/ButtonModule";
import CSS from "./ModifyButton.module.css";


function ModifyButton({isModalOpen, setIsModalOpen}) {

	const scheduleList = useSelector(state => state.buttonReducer);
	const {modify} = useSelector(state => state.calendarReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (isModalOpen) {
				dispatch(initCalList());
				console.log('scheduleList :  ', scheduleList);
				setIsModalOpen(false)
			}
		}, [dispatch, isModalOpen, scheduleList, setIsModalOpen]
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
				dispatch(callUpdateScheduleAPI(scheduleList))
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
							navigate('/cal', {replace: true});
							setIsModalOpen(true);
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
				<button className = {CSS.modifyButton} onClick = {onClickScheduleSaveHandler}
				><span>저장하기</span></button>
			}
		</>
	)
}

export default ModifyButton;