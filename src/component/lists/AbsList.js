import AbsItem from "../items/AbsItem";
import './AbsListCSS.css';

function AbsList({ absList }) {
  return (
    <table className="absDiv">
      <thead>
        <tr>
          <th>출근일</th>
          <th>부서</th>
          <th>직책</th>
          <th>이름</th>
          <th>출근시간</th>
          <th>퇴근시간</th>
          <th>총 근무시간</th>
          <th>연차 여부</th>
          <th>근태 수정</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(absList) && absList.length > 0 ? (
          absList.map((abs) => <AbsItem key={abs.absCode} abs={abs} />)
        ) : (
          <tr>
            <td colSpan="9">데이터가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AbsList;