import './AbsItem.css';
import { useState } from 'react';
import AbsModifyModal from "../modal/AbsModifyModal";

function AbsItem({ abs }) {
  const [absModifyModal, setAbsModifyModal] = useState(false);

  const formatDate = (dateString) => {
    // UTC to Local time
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      timeZone: 'UTC'
    };
    return date.toLocaleDateString('ko-KR', options).replace(/. /g, '.');
};

const formatTime = (date) => {
    if (date && date instanceof Date) {
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const seconds = date.getUTCSeconds().toString().padStart(2, '0');

      return `${hours}:${minutes}:${seconds}`;
    } else if (date && typeof date === 'string' && date.length >= 19) {
      const timeString = date.substr(11, 8);
      return timeString;
    } else if (!date) {
      return "근무 중";
    } else {
      return date;
    }
};

const calculateTotalWorkTime = (start, end) => {
  if (!start || !end) return '';

  const startDate = new Date(start);
  const endDate = new Date(end);

  const startHour = startDate.getHours();  // get local hours
  const endHour = endDate.getHours();  // get local hours

  let diffMs = endDate.getTime() - startDate.getTime();

  if (startHour < 12 && endHour >= 13) {
    diffMs -= 3600000; // 점심 시간 1시간 제외
  } else if (startHour >= 12 && startHour < 13) {  // 출근 시간이 점심시간인 경우
    const lunchTimeLeft = (13 - startHour) * 60 * 60 * 1000 - startDate.getMinutes() * 60 * 1000;
    diffMs -= lunchTimeLeft;
  } else if (endHour >= 12 && endHour < 13) {  // 퇴근 시간이 점심시간인 경우
    const lunchTimeUsed = (endHour - 12) * 60 * 60 * 1000 + endDate.getMinutes() * 60 * 1000;
    diffMs -= lunchTimeUsed;
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${hours}시간 ${minutes}분 ${seconds}초`;
};

  const onClickAbsModifyHandler = () => {
    setAbsModifyModal(true);
  };

  console.log('offDiv:', abs.offDiv);

  return (
    <>
      <tr>
        <td>{formatDate(abs.absDate)}</td>
        <td>{abs.empCode.dept.deptName}</td>
        <td>{abs.empCode.job.jobName}</td>
        <td>{abs.empCode.empName}</td>
        <td>{formatTime(abs.absStart)}</td>
        <td>{formatTime(abs.absEnd)}</td>
        
        <td>{calculateTotalWorkTime(abs.absStart, abs.absEnd)}</td>
        <td>{abs.offDiv}</td>
        <td>
          <button
            className="abs-modify-btn"
            onClick={onClickAbsModifyHandler}
          >
            수정
          </button>
        </td>
      </tr>
      {absModifyModal && (
        <AbsModifyModal abs={abs} setAbsModifyModal={setAbsModifyModal} />
      )}
    </>
  );
}

export default AbsItem;
