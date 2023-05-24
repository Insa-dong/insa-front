import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callMyCalListAPI} from "../../apis/CalendarAPICalls";
import {modifiedCalList} from "../../modules/ButtonModule";
import './MyCalendar.css';


function MyCalendar() {

	const {calList} = useSelector(state => state.calendarReducer);
	const {modify} = useSelector(state => state.calendarReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(
		() => {
			if (modify?.status === 200) {
				dispatch(callMyCalListAPI());
			}
		},
		[dispatch, modify]
	)

	useEffect(
		() => {
			dispatch(callMyCalListAPI());
		},
		[dispatch]
	)

	const mySchedule = () => {

		if (calList.length > 0) {
			return calList.map(schedule => ({
				title: schedule.calTitle,
				id: schedule.calCode,
				content: schedule.calContent,
				start: dayjs(schedule.calStartDate).format('YYYY-MM-DD'),
				end: dayjs(schedule.calEndDate).add(1, 'day').format('YYYY-MM-DD')
			}));
		}
	}

	const setMySchedule = (e) => {

		dispatch(modifiedCalList({
			calCode: e._def.publicId,
			calTitle: e._def.title,
			calContent: e._def.extendedProps.content,
			calStartDate: dayjs(e.start).format('YYYY-MM-DD'),
			calEndDate: dayjs(e.end).subtract(1, 'day').format('YYYY-MM-DD')
		}));
	}

	return (
		<div>
			<FullCalendar
				initialView = "dayGridMonth"
				plugins = {[dayGridPlugin, interactionPlugin]}
				events = {calList && mySchedule()}
				selectable = {true}
				height = {'75vh'}
				weekends = {true}
				editable = {true}
				expandRows = {true}
				selectMirror = {true}
				dayMaxEvents = {5}
				displayEventTime = {false}
				eventChange = {(e) => setMySchedule(e.event)}
			/>
		</div>
	);
}

export default MyCalendar;
