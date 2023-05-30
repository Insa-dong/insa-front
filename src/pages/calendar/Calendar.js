import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMyPagingCalListAPI} from "../../apis/CalendarAPICalls";
import ScheduleRegistModal from "../../component/modal/ScheduleRegistModal";
import CSS from "./Calendar.module.css"
import CalHeader from "./CalHeader";
import ModifyButton from "./ModifyButton";
import MyCalendar from "./MyCalendar";
import './MyCalendar.css'
import PagingBarForCalendar from "./PagingBarForCalendar";


function Calendar() {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [registModalOpen, setRegistModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const {page} = useSelector(state => state.calendarPagingReducer);
	const dispatch = useDispatch();
	const title = '일정';

	console.log(page);

	useEffect(
		() => {
			dispatch(callMyPagingCalListAPI());
		},
		[dispatch]
	)

	return (
		<>
			<CalHeader title = {title}/>
			<div className = {CSS.mainContainer}>
				<MyCalendar/>
				<ModifyButton isModalOpen = {isModalOpen} setIsModalOpen = {setIsModalOpen}
				></ModifyButton>
				<button
					className = {CSS.insertButton}
					onClick = {() => setRegistModalOpen(true)}
				><span>일정 추가</span>
				</button>
				{registModalOpen && <ScheduleRegistModal registModalOpen = {registModalOpen}
				                                         setRegistModalOpen = {setRegistModalOpen}/>}
			</div>
			<div className = {CSS.subContainer}>
				{page &&
					<table className = {CSS.calendarTable}>
						<thead className = {CSS.calendarThead}>
						<tr>
							<th colSpan = {3}>일정 목록</th>
						</tr>
						</thead>
						<tbody className = {CSS.calendarTbody}>
						{page.data && page.data.map(item =>
							<tr className = {CSS.calendarTr} key = {item.calCode}>
								<td colSpan = {2}>{`${item.calStartDate} ~ ${item.calEndDate}`}</td>
								<td>{item.calContent}</td>
							</tr>
						)
						}
						</tbody>
					</table>}
				{page && page.pageInfo && <PagingBarForCalendar pageInfo = {page.pageInfo}
				                                                setCurrentPage = {setCurrentPage}/>}
			</div>
		</>
	);
}

export default Calendar;