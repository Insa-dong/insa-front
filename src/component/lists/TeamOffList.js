
import TeamOffItem from "../items/TeamOffItem";
import './TeamOffList.css';

function TeamOffList({ teamOffList, currentPage, searchOption, searchKeyword }) {

  console.log("teamOffList: ", teamOffList);
    return (
        <table className="teamOffListDiv">
          <thead>
            <tr>
              <th>부서</th>
              <th>직책</th>
              <th>이름</th>
              <th>재직 상태</th>
              <th>총 연차</th>
              <th>사용 연차</th>
              <th>잔여 연차</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teamOffList) && teamOffList.length > 0 ? (
              teamOffList.map((off) => (
              <TeamOffItem 
                key={off.empCode} 
                off={off} 
                currentPage={currentPage}
                searchOption={searchOption}
                searchKeyword={searchKeyword}
                />
                ))
            ) : (
              <tr>
                <td colSpan="7">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      );
}

export default TeamOffList;