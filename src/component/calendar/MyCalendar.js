import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {callMyCalListAPI, callUpdateScheduleAPI} from "../../apis/CalendarAPICalls";
import './MyCalendar.css';


function MyCalendar({isRegistOpen, setIsRegistOpen}) {

	const [form, setForm] = useState([]);
	const [update, setUpdate] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const calList = useSelector(state => state.calendarReducer);
	const {modify} = useSelector(state => state.calendarReducer);

	console.log(calList);
	console.log(form)

	useEffect(
		() => {
			if (modify?.status === 200 && update) {
				dispatch(callMyCalListAPI());
				setUpdate(false);
			}
		},
		[dispatch, modify, update]
	)

	useEffect(
		() => {
			dispatch(callMyCalListAPI());
		},
		[dispatch]
	)

	const myschedule = () => {

		return calList.map(schedule => ({
			title: schedule.calTitle,
			id: schedule.calCode,
			start: dayjs(schedule.calStartDate).format('YYYY-MM-DD'),
			end: dayjs(schedule.calEndDate).add(1, 'day').format('YYYY-MM-DD')
		}))
	}

	const setMySchedule = (e) => {

		calList.map(sche => {
			if ((sche.calCode).toString() === e._def.publicId) {
				sche.calStartDate = dayjs(e.start).format('YYYY-MM-DD')
				sche.calEndDate = dayjs(e.end).subtract(1, 'day').format('YYYY-MM-DD')
			}
		})
	}

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
				setUpdate(true);
				dispatch(callUpdateScheduleAPI(calList))
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
		<div>
			<FullCalendar
				initialView = "dayGridMonth"
				plugins = {[dayGridPlugin, interactionPlugin]}
				events = {calList && !update && myschedule()}
				selectable = {true}
				height = {'75vh'}
				weekends = {true}
				editable = {true}
				selectMirror = {true}
				dayMaxEvents = {5}
				displayEventTime = {false}
				eventChange = {(e) => setMySchedule(e.event)}
			/>
			{form && <button
				onClick = {onClickScheduleSaveHandler}
			>변경사항 저장하기</button>}
		</div>
	);
}

export default MyCalendar;
