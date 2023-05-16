

function MyAbsItem({ abs: { empCode, absDate, absStart, absEnd }, currentUserCode }) {
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
  
    // 현재 사용자와 abs의 empCode를 비교하여 자신의 정보만 표시하도록 조건부 렌더링
    return (
      currentUserCode === empCode.empCode && (
        <tr>
          <td>{formatDate(new Date(absDate))}</td>
          <td>{formatTime(startTime)}</td>
          <td>{formatTime(endTime)}</td>
        </tr>
      )
    );
  }
  
  export default MyAbsItem;