import { useState } from "react";
import { useDispatch } from "react-redux";
import CSS from "./StudyStudentUpdateModal.module.css";

function StudyStudentUpdateModal({ setStudyStudentUpdateModal, student, study }) {
  const [form, setForm] = useState();
  const dispatch = useDispatch();

  const onBackClickHandler = () => {
    setStudyStudentUpdateModal(false);
  };

  return (
    <div className={CSS.modal}>
      <div className={CSS.modalContainer}>
        <div className={CSS.close} onClick={onBackClickHandler}>
          X
        </div>
        <div className={CSS.adviceReviewModalDiv}>
          <div className={CSS.title}>
            <h1>과정 정보 수정</h1>
            <table>
              <tbody>
                <tr>
                  <th>과정명</th>
                  <td>
                    <input
                      type="text"
                      name="trainingTitle"
                    //   value={study ? study.trainingTitle : ""}
                      readOnly={true}
                    />
                  </td>
                </tr>
                <tr>
                  <th>등록일</th>
                  <td>
                    <input
                      type="date"
                      name="studyEnrollDate"
                    //   value={study ? study.studyEnrollDate : ""}
                    />
                  </td>
                </tr>
                <tr>
                  <th>수강 상태</th>
                  <td>
                    <input
                      type="text"
                      name="StudyState"
                    //   value={study ? study.studyState : ""}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyStudentUpdateModal;