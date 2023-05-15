

function AbsItem({ abs: { absCode, empCode, absDate, absStart, absEnd } }) {

    // Date 객체를 생성하는 함수
    const createDate = (dateString) => new Date(`1970-01-01T${dateString}Z`);

    // 시간의 차이를 계산하는 함수
    const calculateTimeDifference = (start, end) => {

        const diffMs = end - start - 3600000; // 점심시간 1시간 제외
        const diffHrs = diffMs / (1000 * 60 * 60);

        return diffHrs * 60 * 60 * 1000;
    };

    // 시간을 문자열로 변환하는 함수
    const formatTime = (totalMs) => {

        const hours = Math.floor(totalMs / (1000 * 60 * 60));
        const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

        return `${hours}시간 ${minutes}분 ${seconds}초`;
    };

    // 날짜를 문자열로 변환하는 함수
    const formatDate = (date) => {

        return new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/. /g, '.');
    };

    const startTime = createDate(absStart);
    const endTime = createDate(absEnd);
    const totalWorkMs = calculateTimeDifference(startTime, endTime);
    const totalWorkTime = formatTime(totalWorkMs);

    return (
        <tr>
            <td>{absCode}</td>
            <td>{empCode.empCode}</td>
            <td>{formatDate(absDate)}</td>
            <td>{absStart}</td>
            <td>{absEnd}</td>
            <td>{totalWorkTime}</td>
        </tr>
    );
}

export default AbsItem;