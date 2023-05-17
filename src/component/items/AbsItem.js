import './AbsItem.css'
import { useState, useEffect } from 'react';
import AbsModifyModal from "../modal/AbsModifyModal"


function AbsItem({ abs: { absCode, empCode, absDate, absStart, absEnd } }) {


  const createDate = (dateString) => new Date(dateString);

  const formatTime = (date) => {
    if (date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      return `${hours}:${minutes}:${seconds}`;
    } else {
      return "근무 중"; // endTime이 없을 경우
    }
  };

  const calculateTimeDifference = (start, end) => {
    if (start && end) {
      const diffMs = end.getTime() - start.getTime() - 3600000; // 점심시간 1시간 제외
      const diffHrs = diffMs / (1000 * 60 * 60);

      return diffHrs * 60 * 60 * 1000;
    } else {
      return 0; // endTime이 없을 경우 0을 반환
    }
  };

  const formatTime2 = (totalMs) => {
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

    return `${hours}시간 ${minutes}분 ${seconds}초`;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    }).format(date).replace(/. /g, '.');
  };

  const startTime = createDate(absStart);
  const endTime = absEnd ? createDate(absEnd) : null;
  const totalWorkMs = calculateTimeDifference(startTime, endTime);
  const totalWorkTime = formatTime2(totalWorkMs);


  const [absModifyModal, setAbsModifyModal] = useState(false);


  /* 리뷰 존재 유무에 따라 Modal 띄우기 */
  useEffect(() => {
    if (absModifyModal) {
      setAbsModifyModal(true);
    }
  }, [absModifyModal]);

  /* 수정 버튼 클릭 이벤트 */
  const onClickAbsModifyHandler = () => {
    setAbsModifyModal(true);
  };




  return (
    <tr>
      <td>{formatDate(new Date(absDate))}</td>
      <td>{empCode.dept.deptName}</td>
      <td>{empCode.job.jobName}</td>
      <td>{empCode.empName}</td>
      <td>{formatTime(startTime)}</td>
      <td>{formatTime(endTime)}</td>
      <td>{totalWorkTime}</td>
      <td><button
        className="abs-modify-btn"
        onClick={onClickAbsModifyHandler}
      >수정</button></td>

      {absModifyModal && (
        <AbsModifyModal
          abs={{
            absCode,
            absDate,
            absStart,
            absEnd,
            empCode: empCode.empName,
          }}
          setAbsModifyModal={setAbsModifyModal}
        />
      )}
    </tr>
  );
}

export default AbsItem;