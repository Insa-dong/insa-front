import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect} from 'react';
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {callMyCalListAPI} from "../../apis/CalendarAPICalls";
import './MyCalendar.css';
import CSS from './MyCalendar.module.css';

function MyCalendar() {

	const dispatch = useDispatch();
	const calList = useSelector(state => state.calendarReducer);

	console.log(calList);

	useEffect(
		() => {
			dispatch(callMyCalListAPI());
		},
		[dispatch]
	)

	const onButtonClickHandler = (e) => {
		console.log(e.target)
	}

	return (
		<div>
			<Button variant = "primary" className = {CSS.rightEnd} onClick = {onButtonClickHandler}>등록</Button>
			<FullCalendar
				initialView = "dayGridMonth"
				plugins = {[dayGridPlugin, interactionPlugin]}
				events = {[
					{title: 'event1', date: '2023-05-23'},
					{title: 'event2', date: '2023-05-25'}
				]}
				height = '80vh'
				selectable = {true}
				weekends = {true}
				selectMirror = {true}
				dayMaxEvents = {3}
				displayEventTime = {false} // 12a 보이지 않도록 하는 속성
			/>
		</div>
	);
}

export default MyCalendar;
