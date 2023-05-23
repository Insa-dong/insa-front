import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callStudentDeleteAPI } from "../../apis/StudentAPICalls";
import './StudentItem.css';

const useConfirm = (message = null, onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirmAction;
};

function StudentItem({ item }) {
  const navigate = useNavigate();
  const [stuCode, setStuCode] = useState(item.stuCode);
  const dispatch = useDispatch();
  const data = useSelector(state => state.studentReducer);



  const okConfirm = () => {
    // 삭제 API 호출
    dispatch(callStudentDeleteAPI(stuCode));
  };

    const cancelConfirm = () => {
    // 취소 시 동작
    console.log("취소되었습니다.");
  };

  const studentDelete = useConfirm(
    "삭제 하시겠습니까?",
    okConfirm,
    cancelConfirm
  );

  const onClickStudentHandler = () => {
    navigate(`/student/${stuCode}`);
  };

  useEffect(() => {
    // 비동기 처리 완료 시 동작
  }, [stuCode]); // stuCode가 변경될 때마다 호출

  return (
    <tr key={item.stuCode}>
      <th onClick={onClickStudentHandler}>{item.stuCode}</th>
      <th onClick={onClickStudentHandler}>{item.stuName}</th>
      <th onClick={onClickStudentHandler}>{item.stuPhone}</th>
      <th onClick={onClickStudentHandler}>{item.stuEmail}</th>
      <th onClick={onClickStudentHandler}>{item.stuEndSchool}</th>
      <th>
        <div className = "stu-btns">
        <button className ="stu-delete-btn" onClick={studentDelete}>삭제</button>
        </div>
      </th>
    </tr>
  );
}

export default StudentItem;

