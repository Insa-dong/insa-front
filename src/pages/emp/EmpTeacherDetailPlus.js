import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeacherNavbar from "../../component/common/TeacherNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { callStudentDetailForAdminAPI } from "../../apis/StudentAPICalls";
import Header from "../../component/common/Header";
import './EmpTeacherDetailPlus.css';
import { useState } from "react";
import { callStudentEvaListAPI } from "../../apis/EvaAPICalls";
import { callStudentAdviceListAPI } from "../../apis/AdviceAPICalls";
import { callStudentAttendDetailAPI } from "../../apis/AttendAPICalls";
import AdviceRegistModal from "../../component/modal/AdviceRegistModal";
import AdviceUpdateModal from "../../component/modal/AdviceUpdateModal";
import EvaRegistModal from "../../component/modal/EvaRegistModal";
import EvaUpdateModal from "../../component/modal/EvaUpdateModal";

function EmpTeacherDetailPlus() {

  const title = '수강생 상세조회';
  const params = useParams();
  const stuCode = params.stuCode;
  const [currentPage, setCurrentPage] = useState();
  const { detail } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  const { evaList } = useSelector((state) => state.evaReducer);
  const { adviceList } = useSelector((state) => state.adviceReducer);
  const { attendDetail } = useSelector((state) => state.attendReducer);
  const [adviceUpdate, setAdviceUpdate] = useState("");
  const [adviceRegist, setAdviceRegist] = useState("");
  const [evaRegist, setEvaRegist] = useState("");
  const [selectedRegistAdvice, setSelectedRegistAdvice] = useState(null);
  const [adviceRegistModalVisible, setAdviceRegistModalVisible] = useState(false);
  const [evaUpdate, setEvaUpdate] = useState("");
  const [selectedUpdateAdvice, setSelectedUpdateAdvice] = useState(null);
  const [adviceUpdateModalVisible, setAdviceUpdateModalVisible] = useState(false);
  const [selectedUpdateEva, setSelectedUpdateEva] = useState(null);
  const [evaUpdateModalVisible, setEvaUpdateModalVisible] = useState(false);
  const [selectedRegistEva, setSelectedRegistEva] = useState(null);
  const [evaRegistModalVisible, setEvaRegistModalVisible] = useState(false);
  const navigate = useNavigate();

  console.log('plusStuCode : ', stuCode);
  console.log('detail : ', detail);
  console.log('attendDetail : ', attendDetail);

  useEffect(() => {
    dispatch(callStudentDetailForAdminAPI({ stuCode }));
    dispatch(callStudentEvaListAPI({ stuCode, currentPage }));
    dispatch(callStudentAdviceListAPI({ stuCode, currentPage }));
    dispatch(callStudentAttendDetailAPI({ stuCode, currentPage }));
  }, [stuCode, currentPage]);

  const onClickRegistHandler = (adviceRegist) => {
    setSelectedRegistAdvice(adviceRegist);
    console.log(stuCode);
    setAdviceRegistModalVisible(true);
  }

  const onClickUpdateHandler = (adviceUpdate) => {
    setSelectedUpdateAdvice(adviceUpdate);
    console.log(stuCode);
    setAdviceUpdateModalVisible(true);

  }

  const onClickEvaRegistHandler = (evaRegist) => {
    setSelectedRegistEva(evaRegist);
    console.log(stuCode);
    setEvaRegistModalVisible(true);
  }

  const onClickEvaUpdateHandler = (evaUpdate) => {
    setSelectedRegistEva(evaUpdate);
    console.log(stuCode);
    setEvaUpdateModalVisible(true);
  }

  return (
    <>
      <TeacherNavbar />
      <Header title={title} />
      <div className="allWrapper">
        {detail && (
          <>
            <table>
              <tbody>
                <tr>
                  <th>이름</th>
                  <td className="stuDetailBox">{detail.stuName}</td>
                </tr>
                <tr>
                  <th>영문이름</th>
                  <td className="stuDetailBox">{detail.stuEngName}</td>
                </tr>
                <tr>
                  <th>생년월일</th>
                  <td className="stuDetailBox">{detail.stuBirth}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td className="stuDetailBox">{detail.stuEmail}</td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td className="stuDetailBox">{detail.stuPhone}</td>
                </tr>
              </tbody>
            </table>

          </>
        )}
      
      
        <h2 className="studyHeader">출결 내역</h2>
        <table className="stuDetailDiv">
          <thead>
            <tr>
              <th>학생번호</th>
              <th>출석 코드</th>
              <th>날짜</th>
              <th>출석</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(attendDetail) && attendDetail.length > 0 ? (
              attendDetail.map((attend) => (
                <tr key={attend.attendCode}>
                  <td>{attend.student.stuCode}</td>
                  <td>{attend.attendCode}</td>
                  <td>{attend.attendDate}</td>
                  <td>{attend.attendStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">출석 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
    

      {evaRegistModalVisible && (
        <EvaRegistModal
          evaRegist={selectedRegistEva}
          setEvaRegistModal={setEvaRegistModalVisible}
          stuCode={stuCode}
        />
      )}

      {evaUpdateModalVisible && (
        <EvaUpdateModal
          evaUpdate={selectedUpdateEva}
          setEvaUpdateModal={setEvaUpdateModalVisible}
          stuCode={stuCode}
        />
      )}

<div className="studyHeaderContainer">
        <h2 className="studyHeader" >평가 내역</h2>
        <button className="registrationButton" onClick={() => onClickEvaRegistHandler(evaRegist)}>등록</button>
       </div>
        <table className="stuDetailDiv" >
          <thead>
            <th>평가 코드</th>
            <th>강의 이름</th>
            <th>강사명</th>
            <th>수정/삭제</th>
          </thead>
          <tbody>
            {Array.isArray(evaList) && evaList.length > 0 ? (
              evaList.map((eva) => (
                <tr key={eva}>
                  <td>{eva.evaCode}</td>
                  <td>{eva.studyInfo.studyTitle}</td>
                  <td>{eva.studyInfo.teacher.empName}</td>
                  <td>
                    <button className="studyStuUpdateBtn" onClick={() => onClickEvaUpdateHandler()}>수정</button>
                    <button className="studyStuDeleteBtn">삭제</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">평가 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      

      {adviceRegistModalVisible && (
        <AdviceRegistModal
          adviceRegist={selectedRegistAdvice}
          setAdviceRegistModal={setAdviceRegistModalVisible}
          stuCode={stuCode}
        />
      )}

      {adviceUpdateModalVisible && (
        <AdviceUpdateModal
          adviceUpdate={selectedUpdateAdvice}
          setAdviceUpdateModal={setAdviceUpdateModalVisible}
          stuCode={stuCode}
        />
      )}
<div className="studyHeaderContainer">
        <h2 className="studyHeader" >상담 내역</h2>
        <button className="registrationButton" onClick={() => onClickRegistHandler(adviceRegist)}>등록</button>
        </div>
        <table className="stuDetailDiv">
          <thead>
            <tr>
              <th>일지코드</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(adviceList) && adviceList.length > 0 ? (
              adviceList.map((advice) => (
                <tr key={advice}>
                  <td>{advice.adviceLogCode}</td>
                  <td>{advice.writer.empName}</td>
                  <td>{advice.adviceLogDate}</td>
                  <td>
                    <button className="studyStuUpdateBtn" onClick={() => onClickUpdateHandler(adviceUpdate)} >수정</button>
                    <button className="studyStuDeleteBtn">삭제</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">상담 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="stubeforeBtn"
                    onClick={() => navigate(-1)}>
                    이전으로</button>
      </div>
    </>
  );
}

export default EmpTeacherDetailPlus;