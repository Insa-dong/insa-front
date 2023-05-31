import CSS from "./Main.module.css"

function Main() {


	return (
		<div className={CSS.mainWrapper}>
			<div className={CSS.noticeCalendar}>
				<div className={CSS.notice}>공지사항</div>
				<div className={CSS.calendar}>캘린더</div>
			</div>
			<div className={CSS.buttonWeather}>
				<ul>
					<li>출퇴근</li>
					<li>연차신청</li>
					<li>수강생등록</li>
					<li>강의등록</li>
				</ul>
				<div className={CSS.weather}>날씨</div>
			</div>
			<div className={CSS.newsLecture}>
				<div className={CSS.news}>뉴스</div>
				<div className={CSS.lecture}>강의</div>
			</div>
		</div>
	);
}

export default Main;