import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CSS from "./StudyStudentUpdateModal.module.css";
import { callStudyStuUpdateForAdminAPI } from "../../apis/StudyStuAPICalls";
import { useNavigate } from "react-router-dom";


function StudyStudentUpdateModal({ studyStudentUpdate, setStudyStudentUpdateModal, stuCode }) {

  const [form, setForm] = useState({
    studyCode: studyStudentUpdate.studyCode || "",
    studyEnrollDate: studyStudentUpdate?.studyEnrollDate?.split(" ")[0] || "",
  studyState: studyStudentUpdate?.studyState || "수강 중", 
  });
  
  const { modify } = useSelector(state => state.studyStudentReducer);
  const navigate = useNavigate();
  
  console.log(form);

  const dispatch = useDispatch();

  const onBackClickHandler = () => {
    setStudyStudentUpdateModal(false);
  };

  useEffect(() => {
    if (modify?.status === 200) {
        alert('강의 내용 수정이 완료되었습니다');
        navigate('/student');
    }
}, [modify]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
      studyCode: studyStudentUpdate.studyCode,
    }));
    
  };

  
  const onSaveHandler = () => {
    dispatch(
      callStudyStuUpdateForAdminAPI({...form,stuCode})
    );
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
                      name="studyCode"
                      readOnly={studyStudentUpdate.trainingTitle === null}
                      value={studyStudentUpdate.trainingTitle}
                      onChange={ onChangeHandler }
                    />
                  </td>
                </tr>
                <tr>
                  <th>등록일</th>
                  <td>
                    <input
                      type="date"
                      name="studyEnrollDate"
                      value={ form.studyEnrollDate || studyStudentUpdate?.studyEnrollDate?.split(" ")[0]}
                      onChange={onChangeHandler}
                    />
                  </td>
                </tr>
                <tr>
                  <th>수강 상태</th>
                  <td>
                    <select
                      name="studyState"
                      value={ form.studyState || studyStudentUpdate.studyState}
                      onChange={onChangeHandler}
                    >
                      <option value="수강 중">수강 중</option>
                      <option value="수강 보류">수강 보류</option>
                      <option value="수강 취소">수강 취소</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={onSaveHandler}>수정 하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default StudyStudentUpdateModal;
