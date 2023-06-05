import CSS from "./Main.module.css"
import Weather from './Weather';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { callBoardListAPI } from './../../apis/BoardAPICall';
import { useSelector } from 'react-redux';
import { callStudyInfoListAPI } from "../../apis/StudyInfoAPICalls";
import NewsList from "../lists/NewsList";
import { NavLink } from "react-router-dom";

function formatDate(dateString) {
	const date = new Date(dateString);
	const options = { year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" };
	return new Intl.DateTimeFormat("ko-KR", options).format(date).replace(/\.$/, "");

}


function Main() {

	const dispatch = useDispatch();
	const { data } = useSelector(state => state.boardReducer);
	const study = useSelector(state => state.studyInfoReducer);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(
		() => {
			dispatch(callBoardListAPI({ currentPage }));
			dispatch(callStudyInfoListAPI({ currentPage }));
		},
		[]
	);

	return (
		<div className={CSS.mainWrapper}>
			<div className={CSS.noticeCalendar}>
				<div className={CSS.notice}>
					<NavLink to="/board">
						<div className={CSS.noticeT}>공지사항</div>
					</NavLink>
					{data && data.map(p => (
						<ul className={CSS.noticeContent} style={{ display: 'flex' }} key={p.noticeCode}>
							<li>
								<ul style={{ display: 'flex' }}>
									<li><img src="/images/공지사항제목.png" className={CSS.boardImg}
										alt="공지사항제목이미지" /></li>
									<li className={CSS.noticetitle}>{p.noticeTitle}</li>
								</ul>
							</li>
							<li className={CSS.content}>{p.noticeContent}</li>
							<li className={CSS.writer}>{p.noticeWriter.empName}</li>
							<li><img src="/images/화살표.png" className={CSS.allowImg} alt="화살표이미지" />
							</li>
							<li className={CSS.dept}>{p.noticeWriter.dept.deptName}팀·</li>
							<li className={CSS.job}>{p.noticeWriter.job.jobName}</li>
							<li className={CSS.date}>{formatDate(p.noticeWriteDate)}</li>
						</ul>))}
				</div>
			</div>
			<div className={CSS.buttonWeather}>
				<ul className={CSS.button}>
					<NavLink to="/abs">
						<ul className={CSS.mainBtn}>
							<li className={CSS.mainBtnTitle}>출퇴근</li>
							<img src="/images/출퇴근.png" className={CSS.mainBtnImg} />
						</ul>
					</NavLink>
					<NavLink to="/off">
						<ul className={CSS.mainBtn}>
							<li className={CSS.mainBtnTitle}>연차신청</li>
							<img src="/images/연차신청2.png" className={CSS.mainBtnImg} />
						</ul>
					</NavLink>
					<NavLink to="/student/registration">
						<ul className={CSS.mainBtn}>
							<li className={CSS.mainBtnTitle}>수강생등록</li>
							<img src="/images/수강생등록.png" className={CSS.mainBtnImg} />
						</ul>
					</NavLink>
					<NavLink to="/study/registration">
						<ul className={CSS.mainBtn}>
							<li className={CSS.mainBtnTitle}>강의등록</li>
							<img src="/images/강의등록.png" className={CSS.mainBtnImg} />
						</ul>
					</NavLink>
				</ul>
				<div className={CSS.weather}>
					<Weather />
				</div>
			</div>
			<div className={CSS.newsLecture}>
				<div className={CSS.news}>
					<NewsList />
				</div>
				<div className={CSS.lecture}>
					<NavLink to="/study">
						<div className={CSS.lectureTitle}>강의</div>
					</NavLink>
					<table className={CSS.tableStyle}>
						<thead>
							<tr className={CSS.trStyle}>
								<th>강의 명</th>
								<th>수업 기간</th>
								<th>정원</th>
								<th>강사 명</th>
							</tr>
						</thead>
						<tbody className={CSS.BodyTrStyle}>
							{study.data && study.data.slice(0, 4).map(s => (
								<tr key={s.studyInfoCode} className={CSS.trStyle}>
									<th>{s.studyTitle}</th>
									<th>{s.studyInfoStartDate} ~ {s.studyInfoEndDate}</th>
									<th>{s.study.studyMaxPeople}</th>
									<th>{s.teacher.empName}</th>
								</tr>))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Main;