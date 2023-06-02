import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CSS from "./StudentAttendRegistModal.module.css";
import { callStudentAttendRegistAPI } from "../../apis/AttendAPICalls";
import Swal from "sweetalert2";

function StudentAttendRegistModal({ stuCode, studyCode, setStudentAttendRegistModal }) {

  const [form, setForm] = useState({
    study: { studyCode },
    student: { stuCode }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('modalStudyCode : ', studyCode);
  console.log('modalStuCode : ', stuCode);
  console.log(form);

  const onClickHandler = () => {
    setStudentAttendRegistModal(false);
  };

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onClickStudentAttendRegistHandler = () => {
    if (form && form.attendStatus) {
      dispatch(callStudentAttendRegistAPI({ ...form, studyCode, stuCode }));
      Swal.fire({
        text: '출결 등록이 완료되었습니다.',
        icon: 'success',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'custom-success-button'
        }
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire(
        '입력 오류',
        '날짜와 출결 상태를 선택해주세요.',
        'error'
      );
    }
  };

  return (
    <div className={CSS.modal}>
      <div className={CSS.modalContainer}>
        <div className={CSS.close} onClick={onClickHandler}>
          X
        </div>
        <div className={CSS.adviceReviewModalDiv}>
          <div className={CSS.title}>
            <h1>👨🏻‍🎓 수강생 출결 등록</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th className={CSS.tableTh}>출결</th>
                <td>
                  <select
                    name="attendStatus"
                    onChange={onChangeHandler}
                  >
                    <option>선택</option>
                    <option>출석</option>
                    <option>결석</option>
                    <option>지각</option>
                    <option>조퇴</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={onClickStudentAttendRegistHandler}>등록하기</button>
        </div>
      </div>
    </div>
  );
}

export default StudentAttendRegistModal;