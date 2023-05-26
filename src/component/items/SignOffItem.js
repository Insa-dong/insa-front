import './SignOffItem.css';
import { useState } from 'react';
import OffSignModal from '../modal/OffSignModal';

function SignOffItem({ off }) {
  const [offSignModal, setOffSignModal] = useState(false);

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

  const onClickOffSignModalHandler = () => {
    setOffSignModal(true);
  };

  return (
    <>
    <tbody className="signOffItemtbody">
      <tr className="signOffDiv" onClick={onClickOffSignModalHandler}>
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
      </tbody>
     
      {offSignModal && (
        <OffSignModal
          off={off}
          setOffSignModal={setOffSignModal}
        />
      )}
      
    </>
  );
}

export default SignOffItem;