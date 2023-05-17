import AbsItem from "../items/AbsItem";
import './AbsListCSS.css';

function AbsList({ absList }) {
  return (
    <table className="absDiv">
      <thead>
        <tr>
          <th>출근일</th>
          <th>부서명</th>
          <th>직급명</th>
          <th>이름</th>
          <th>출근시간</th>
          <th>퇴근시간</th>
          <th>총 근무시간</th>
          <th>근태 수정</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(absList) && absList.length > 0 ? (
          absList.map((abs) => <AbsItem key={abs.absCode} abs={abs} />)
        ) : (
          <tr>
            <td colSpan="8">데이터가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AbsList;