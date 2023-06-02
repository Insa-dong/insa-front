import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { callStudentDeleteAPI } from "../../apis/StudentAPICalls";
import './StudentItem.css';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function StudentItem({ item }) {
  const [stuCode, setStuCode] = useState(item.stuCode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const okConfirm = () => {
    // 삭제 API 호출
    dispatch(callStudentDeleteAPI(stuCode))
      .then(() => {
        Swal.fire({
          text: '삭제가 완료 되었습니다.',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'custom-success-button'
          }
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire(
          '삭제 실패',
          '다시 시도하세요.',
          'error'
        );
      });
  };

  const cancelConfirm = () => {
    console.log("취소되었습니다.");
  };

  const studentDelete = () => {
    Swal.fire({
      text: '삭제 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
      },
      confirmButtonColor: '#8CBAFF',
      cancelButtonColor: '#DADADA',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      reverseButtons: true,
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        okConfirm();
      } else {
        cancelConfirm();
      }
    });
  };

  const onClickStudentHandler = (e) => {
    if (e.target.classList.contains('stu-delete-btn')) {
      return;
    }

    navigate(`/student/${stuCode}`);
  };

  useEffect(() => {}, [stuCode]); // stuCode가 변경될 때마다 호출

  return (
    <tr key={item.stuCode} onClick={onClickStudentHandler}>
      <th>{item.stuCode}</th>
      <th>{item.stuName}</th>
      <th>{item.stuPhone}</th>
      <th>{item.stuEmail}</th>
      <th>{item.stuEndSchool}</th>
      <th>
        <div className="stu-btns">
          <button className="stu-delete-btn" onClick={studentDelete}>삭제</button>
        </div>
      </th>
    </tr>
  );
}

export default StudentItem;
