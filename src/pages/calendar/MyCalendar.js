import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import React, {useEffect, useState} from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {callMyCalListAPI} from "../../apis/CalendarAPICalls";
import ScheduleInfoModal from "../../component/modal/ScheduleInfoModal";
import {modifiedCalList} from "../../modules/ButtonModule";
import './MyCalendar.css';


function MyCalendar() {

	const [info, setInfo] = useState();
	const [modalOpen, setModalOpen] = useState(false);
	const {modify} = useSelector(state => state.calendarReducer);
	const {calInfo} = useSelector(state => state.calendarReducer);
	const {calList} = useSelector(state => state.calendarReducer);
	const {regist} = useSelector(state => state.calendarReducer);
	const {remove} = useSelector(state => state.calendarReducer);
	const dispatch = useDispatch();

	console.log(calList);

	useEffect(
		() => {
			dispatch(callMyCalListAPI());
		},
		[dispatch, modify, regist, calInfo, info, remove]
	)

	useEffect(
		() => {
			if (!modalOpen)
				dispatch(callMyCalListAPI());
		},
		[dispatch, modalOpen]
	)

	const mySchedule = () => {

		if (calList.length > 0) {
			return calList.map(schedule => ({
				calTitle: schedule.calTitle,
				id: schedule.calCode,
				content: schedule.calContent,
				color: schedule.calColor,
				calColor: schedule.calColor,
				start: dayjs(schedule.calStartDate).format('YYYY-MM-DD'),
				end: dayjs(schedule.calEndDate).add(1, 'day').format('YYYY-MM-DD'),
			}))
		}
	}

	const setMySchedule = (e) => {

		dispatch(modifiedCalList({
			calCode: e._def.publicId,
			calTitle: e._def.extendedProps.calTitle,
			calContent: e._def.extendedProps.content,
			calColor: e._def.extendedProps.calColor,
			calStartDate: dayjs(e.start).format('YYYY-MM-DD'),
			calEndDate: dayjs(e.end).subtract(1, 'day').format('YYYY-MM-DD')
		}));
	}

	const viewMySchedule = (e) => {

		console.log(e);
		setInfo({
			calCode: e._def.publicId,
			calTitle: e._def.extendedProps.calTitle,
			calContent: e._def.extendedProps.content,
			calColor: e.backgroundColor,
			calStartDate: dayjs(e.start).format('YYYY-MM-DD'),
			calEndDate: dayjs(e.end).subtract(1, 'day').format('YYYY-MM-DD')
		})
		setModalOpen(true);
	}

	const renderTooltip = (e) => (
		<Tooltip
			title = {e._def.extendedProps.calTitle}
		>
			{`일정 명 : ${e._def.extendedProps.calTitle}`}
			<br/>
			<br/>
			{`코멘트 : ${e._def.extendedProps.content}`}
		</Tooltip>
	);

	const popupSchedule = (e) => {

		return (
			<OverlayTrigger
				placement = 'auto'
				trigger = {['hover', 'hover']}
				overlay = {renderTooltip(e)}
			>
				<div>
					{e._def.extendedProps.calTitle}
				</div>
			</OverlayTrigger>
		)
	}

	return (
		<>
			<div className = 'calendar'>
				<FullCalendar
					initialView = "dayGridMonth"
					plugins = {[dayGridPlugin, interactionPlugin]}
					events = {calList && mySchedule()}
					selectable = {true}
					headerToolbar = {{
						center: 'title',
						left: 'prev',
						right: 'next',
					}}
					height = {'80vh'}
					weekends = {true}
					editable = {true}
					selectMirror = {true}
					dayMaxEvents = {3}
					eventChange = {(e) => setMySchedule(e.event)}
					eventClick = {(e) => viewMySchedule(e.event)}
					eventContent = {(e) => popupSchedule(e.event)}
				/>
			</div>
			{info && info.calCode &&
				<ScheduleInfoModal info = {info} modalOpen = {modalOpen} setModalOpen = {setModalOpen}/>}
		</>
	);
}

export default MyCalendar;
