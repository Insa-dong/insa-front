import './SignOffItem.css';

function SignOffItem({ off, onClick}) {
  

  let statusColor;
  switch (off.signStatus) {
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
    <>
    
      <tr className="signOffDiv" onClick={() => onClick(off)}>
        <td className='td-job'>{off.signRequester.job.jobName}</td>
        <td className="td-name">{off.signRequester.empName}</td>
        <td className="td-div3">{off.offDiv}</td>
        <td className="td-start3">{off.offStart}</td>
        <td className="td-end3">{off.offEnd}</td>
        <td className="td-day3">{off.offDay}일</td>
        <td className="td-signStatus3">
          <button className="btn-signStatus3" style={{ backgroundColor: statusColor }}>{off.signStatus}</button>
        </td>
      </tr>
      
     

      
    </>
  );
}

export default SignOffItem;