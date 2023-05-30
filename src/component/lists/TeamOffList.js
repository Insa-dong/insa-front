import TeamOffItem from "../items/TeamOffItem";
import './TeamOffList.css';

function TeamOffList({ teamOffList, currentPage, searchOption, searchKeyword }) {


    return (
        <table className="absDiv">
          <thead>
            <tr>
              <th>직책</th>
              <th>이름</th>
              <th>총 연차</th>
              <th>사용 연차</th>
              <th>잔여 연차</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teamOffList) && teamOffList.length > 0 ? (
              teamOffList.map((off) => 
              <TeamOffItem 
                key={off.empCode} 
                off={off} 
                currentPage={currentPage}
                searchOption={searchOption}
                searchKeyword={searchKeyword}/>)
            ) : (
              <tr>
                <td colSpan="5">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      );
}

export default TeamOffList;