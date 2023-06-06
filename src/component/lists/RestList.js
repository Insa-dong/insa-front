import RestItem from '../items/RestItem';
import './RestList.css';

function RestList({ restList }) {
    console.log("hell: ", restList);

    return (
        <table className="restOffListDiv">
            <thead>
                <tr>
                    <th className="empRestTable">부서</th>
                    <th className="empRestTable">직책</th>
                    <th className="empRestTable">이름</th>
                    <th className="empRestTableWrap">휴직 시작일</th>
                    <th className="empRestTableWrap">휴직 종료일</th>
                    <th className="empRestTableWrap">신청사유</th>
                    <th className="empRestTableWrap">승인상태</th>
                    <th style={{ width: '260px'}}>휴직처리</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(restList) && restList.length > 0 ? (
                    restList.map((rest) => (
                        <RestItem key={rest.empCode} rest={rest} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="8">신청내역이 없습니다.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default RestList;
