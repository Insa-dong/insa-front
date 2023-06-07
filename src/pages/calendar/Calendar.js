import dayjs from "dayjs";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import {callDeleteScheduleAPI, callMyPagingCalListAPI} from "../../apis/CalendarAPICalls";
import ScheduleInfoModal from "../../component/modal/ScheduleInfoModal";
import ScheduleRegistModal from "../../component/modal/ScheduleRegistModal";
import CSS from "./Calendar.module.css"
import CalHeader from "./CalHeader";
import ModifyButton from "./ModifyButton";
import MyCalendar from "./MyCalendar";
import './MyCalendar.css'
import PagingBarForCalendar from "./PagingBarForCalendar";


function Calendar() {

	const {page} = useSelector(state => state.calendarPagingReducer);
	const {remove} = useSelector(state => state.calendarReducer);
	const {modify} = useSelector(state => state.calendarReducer);
	const {calList} = useSelector(state => state.calendarReducer);
	const {calInfo} = useSelector(state => state.calendarReducer);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [registModalOpen, setRegistModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [sort, setSort] = useState(0);
	const [info, setInfo] = useState();
	const [checkValue, setCheckValue] = useState([]);
	const dispatch = useDispatch();
	const ref = useRef([]);
	const title = '일정';

	useEffect(
		() => {
			dispatch(callMyPagingCalListAPI({currentPage, sort}));
		},
		[dispatch, currentPage, sort, modify, remove, calList, calInfo]
	)

	const scheduleOnclickHandler = (item) => {
		console.log(item)
		setInfo({
			calCode: item.calCode,
			calTitle: item.calTitle,
			calContent: item.calContent,
			calColor: item.calColor,
			calStartDate: dayjs(item.calStartDate).format('YYYY-MM-DD'),
			calEndDate: dayjs(item.calEndDate).format('YYYY-MM-DD')
		})
		setModalOpen(true)
	}

	const onClickHandler = (e) => {
		switch (e.target.innerHTML) {
			case '최근 등록일 순':
				setSort(0);
				return;
			case'시작일 순':
				setSort(1);
				return;
			case'종료일 순':
				setSort(2);
				return;
			default :
				setSort(0);
		}
	}

	const deleteButtonHandler = () => {
		ref.current.map(item => {
			if (item.checked) {
				checkValue.push(item.value);
			}
		})
		Swal.fire({
			text: `${checkValue} 번 일정을 삭제합니다.`,
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
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(callDeleteScheduleAPI(checkValue))
					.then(() => {
						Swal.fire({
							title: '삭제 완료',
							text: '삭제 완료.',
							icon: 'success',
							buttonsStyling: false,
							customClass: {
								confirmButton: 'custom-success-button'
							}
						}).then(() => {
							setModalOpen(false);
						});
					})
					.catch((error) => {
						Swal.fire(
							'삭제 실패',
							'다시 시도하세요.',
							'error'
						);
					});
			} else if (result.dismiss) {
				setCheckValue([]);
			}
		});
	}

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
				<button className = {sort === 0 ? CSS.sortButton1 : CSS.sortButton} onClick = {onClickHandler}>
					최근 등록 순
				</button>
				<button className = {sort === 1 ? CSS.sortButton1 : CSS.sortButton} onClick = {onClickHandler}>
					시작일 순
				</button>
				<button className = {sort === 2 ? CSS.sortButton1 : CSS.sortButton} onClick = {onClickHandler}>
					종료일 순
				</button>
				{page &&
					<table className = {CSS.calendarTable}>
						<thead className = {CSS.calendarThead}>
						<tr>
							<th colSpan = {3}>일정 목록</th>
						</tr>
						</thead>
						<tbody className = {CSS.calendarTbody}>
						{page.data && page.data.map((item, index) =>
							<tr className = {CSS.calendarTr} key = {item.calCode}>
								<td>
									<input type = "checkbox"
									       ref = {element => ref.current[index] = element}
									       className = {CSS.checkBox}
									       value = {item.calCode}
									/></td>
								<td onClick = {() => scheduleOnclickHandler(item)}>{`${item.calStartDate} ~ ${item.calEndDate}`}</td>
								<td onClick = {() => scheduleOnclickHandler(item)}>{item.calTitle}</td>
							</tr>
						)}
						</tbody>
					</table>}
				{page && page.pageInfo &&
					<PagingBarForCalendar pageInfo = {page.pageInfo} setCurrentPage = {setCurrentPage}/>}
				<button className = {CSS.deleteButton} onClick = {deleteButtonHandler}>삭제
				</button>
				{info && info.calCode &&
					<ScheduleInfoModal info = {info} modalOpen = {modalOpen} setModalOpen = {setModalOpen}/>}
			</div>
		</>
	);
}

export default Calendar;