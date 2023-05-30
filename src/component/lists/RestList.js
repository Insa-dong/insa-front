import RestItem from '../items/RestItem';

function RestList({ restList }) {
    console.log("hell: ", restList);

    return (
        <table>
            <thead>
                <tr>
                    <th>부서</th>
                    <th>직책</th>
                    <th>이름</th>
                    <th>휴직 시작일</th>
                    <th>휴직 종료일</th>
                    <th>신청사유</th>
                    <th>승인상태</th>
                    <th>휴직처리</th>
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
