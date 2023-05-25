import './SignOffItem.css';

function SignOffItem({off: { signRequester, offDiv, offStart, offEnd, offDay, signStatus }}) {


    let statusColor;
    switch (signStatus) {
        case "대기":
            statusColor = "#AAAAAA";
            break;
        case "반려":
            statusColor = "#FFA9B0";
            break;
        case "승인":
            statusColor = "#8CBAFF";
            break;
    }
    return (
       
        <tr className="signOffDiv">
            <td className='td-job'>{signRequester.job.jobName}</td>
            <td className="td-name">{signRequester.empName}</td>
            <td className="td-div3">{offDiv}</td>
            <td className="td-start3">{offStart}</td>
            <td className="td-end3">{offEnd}</td>
            <td className="td-day3">{offDay}일</td>
            <td className="td-signStatus3" style={{backgroundColor: statusColor}}>{signStatus}</td>
        </tr>
       
    )


}

export default SignOffItem;