import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeacherNavbar from "../../component/common/TeacherNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { callStudentDetailForAdminAPI } from "../../apis/StudentAPICalls";
import Header from "../../component/common/Header";
import './EmpTeacherDetailPlus.css';
import { useState } from "react";
import { callEvaDeleteForAdminAPI, callStudentEvaListAPI } from "../../apis/EvaAPICalls";
import { callAdviceDeleteForAdminAPI, callStudentAdviceListAPI } from "../../apis/AdviceAPICalls";
import { callStudentAttendDetailAPI } from "../../apis/AttendAPICalls";
import AdviceRegistModal from "../../component/modal/AdviceRegistModal";
import AdviceUpdateModal from "../../component/modal/AdviceUpdateModal";
import EvaRegistModal from "../../component/modal/EvaRegistModal";
import EvaUpdateModal from "../../component/modal/EvaUpdateModal";
import EvaReviewCheckModal from "../../component/modal/EvaReviewCheckModal";
import AdviceReviewModal from "../../component/modal/AdviceReviewModal";
import { callStudentAttendDeleteAPI } from "../../apis/AttendAPICalls";
import StudentAttendUpdateModal from "../../component/modal/StudentAttendUpdateModal";


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
  const [adviceRegist, setAdviceRegist] = useState("");
  const [evaRegist, setEvaRegist] = useState("");
  const [selectedRegistAdvice, setSelectedRegistAdvice] = useState(null);
  const [adviceRegistModalVisible, setAdviceRegistModalVisible] = useState(false);
  const [selectedUpdateAdvice, setSelectedUpdateAdvice] = useState(null);
  const [adviceUpdateModalVisible, setAdviceUpdateModalVisible] = useState(false);
  const [selectedUpdateEva, setSelectedUpdateEva] = useState(null);
  const [evaUpdateModalVisible, setEvaUpdateModalVisible] = useState(false);
  const [selectedRegistEva, setSelectedRegistEva] = useState(null);
  const [evaRegistModalVisible, setEvaRegistModalVisible] = useState(false);
  const [selectedEvaReview, setSelectedEvaReview] = useState(null);
  const [evaReviewModalVisible, setEvaReviewModalVisible] = useState(false);
  const [selectedAdviceReview, setSelectedAdviceReview] = useState(null);
  const [adviceReviewModalVisible, setAdviceReviewModalVisible] = useState(false);
  const [selectedAttendUpdate, setSelectedAttendUpdate] = useState(null);
  const [attendUpdateModalVisible, setAttendUpdateModalVisible] = useState(false);
  const location = useLocation();
  const [attendCode, setAttendCode] = useState();
  const { item } = location.state;
  const { studyInfoCode, teacher: { empCode } } = item;
  const navigate = useNavigate();


  console.log('plusStuCode : ', stuCode);
  console.log('detail : ', detail);
  console.log('attendDetail : ', attendDetail);
  console.log('studyInfoCode : ', studyInfoCode);
  console.log('empCode : ', empCode);

  useEffect(() => {
    dispatch(callStudentDetailForAdminAPI({ stuCode }));
    dispatch(callStudentEvaListAPI({ stuCode, currentPage }));
    dispatch(callStudentAdviceListAPI({ stuCode, currentPage }));
    dispatch(callStudentAttendDetailAPI({ stuCode, currentPage }));
  }, [stuCode, currentPage]);


  const evaDelete = (evaCode) => {
    const confirmed = window.confirm("평가 내역을 삭제하시겠습니까?");
    if (confirmed) {
      console.log('evaCode : ', evaCode);
      dispatch(callEvaDeleteForAdminAPI({ evaCode }));
    } else {
      console.log("평가 삭제가 취소되었습니다.");
    }
  };

  const adviceDelete = (adviceLogCode) => {
    const confirmed = window.confirm("상담 내역을 삭제하시겠습니까?");
    if (confirmed) {
      console.log('adviceLogCode : ', adviceLogCode);
      dispatch(callAdviceDeleteForAdminAPI({ adviceLogCode }));
    } else {
      console.log("상담 삭제가 취소되었습니다.");
    }
  };

  const attendDelete = (attendCode) => {
    const confirmed = window.confirm("출석 내역을 삭제하시겠습니까?");
    if (confirmed) {
      console.log('DeleteAttendCode : ', attendCode);
      dispatch(callStudentAttendDeleteAPI({ attendCode }));
    } else {
      console.log("출결 삭제가 취소되었습니다.");
    }
  };

  const onClickUpdateAttend = (attendCode) => {
    setSelectedAttendUpdate(attendCode);
    console.log('attendCode : ', attendCode);
    setAttendUpdateModalVisible(true);
  }

  const onClickRegistHandler = (adviceRegist) => {
    setSelectedRegistAdvice(adviceRegist);
    console.log(stuCode);
    setAdviceRegistModalVisible(true);
  }

  const onClickEvaRegistHandler = (evaRegist) => {
    setSelectedRegistEva(evaRegist);
    console.log(stuCode);
    setEvaRegistModalVisible(true);
  }

  const onClickAdviceUpdateHandler = (adviceLogCode) => {
    setSelectedUpdateAdvice(adviceLogCode);
    console.log('adviceLogCode : ', adviceLogCode);
    setAdviceUpdateModalVisible(true);
  }

  const onClickEvaUpdateHandler = (evaCode) => {
    setSelectedUpdateEva(evaCode);
    console.log(stuCode);
    console.log('evaCode : ', evaCode);
    setEvaUpdateModalVisible(true);
  }

  const onClickEvaReviewHandler = (evaReview) => {
    setSelectedEvaReview(evaReview);
    setEvaReviewModalVisible(true);
  }


  const onClickAdviceReviewHandler = (adviceReview) => {
    setSelectedAdviceReview(adviceReview);
    setAdviceReviewModalVisible(true);
  };


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

        {attendUpdateModalVisible && (
          <StudentAttendUpdateModal
            attendCode={selectedAttendUpdate}
            setStudentAttendUpdateModal={setAttendUpdateModalVisible}
            stuCode={stuCode}
          />
        )}

        <h2 className="studyHeader">출결 내역</h2>
        <table className="stuDetailDiv">
          <thead>
            <tr>
              <th>학생번호</th>
              <th>출석 코드</th>
              <th>날짜</th>
              <th>출석</th>
              <th>수정/삭제</th>
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
                  <td>
                    <button className = "attendUpdateBtn" onClick={ () => onClickUpdateAttend(attend.attendCode)}>수정</button>
                    <button className = "attendDeleteBtn" onClick={ () => attendDelete(attend.attendCode)}>삭제</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">출석 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>


        {evaRegistModalVisible && (
          <EvaRegistModal
            evaRegist={selectedRegistEva}
            setEvaRegistModal={setEvaRegistModalVisible}
            stuCode={stuCode}
            studyInfoCode={studyInfoCode}
            empCode={empCode}
          />
        )}

        {evaUpdateModalVisible && (
          <EvaUpdateModal
            evaCode={selectedUpdateEva}
            setEvaUpdateModal={setEvaUpdateModalVisible}
            stuCode={stuCode}
            studyInfoCode={studyInfoCode}
            empCode={empCode}
          />
        )}

        {evaReviewModalVisible && (
          <EvaReviewCheckModal
            evaReview={selectedEvaReview}
            setEvaReviewModal={setEvaReviewModalVisible}
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
            <th>작성 일</th>
            <th>수정/삭제</th>
          </thead>
          <tbody>
            {Array.isArray(evaList) && evaList.length > 0 ? (
              evaList.map((eva) => (
                <tr key={eva.evaCode}>
                  <td onClick={() => onClickEvaReviewHandler(eva.evaCode)}>{eva.evaCode}</td>
                  <td onClick={() => onClickEvaReviewHandler(eva)}>{eva.studyInfo.studyTitle}</td>
                  <td onClick={() => onClickEvaReviewHandler(eva)}>{eva.studyInfo.teacher.empName}</td>
                  <td onClick={() => onClickEvaReviewHandler(eva)}>{eva.evaWriteDate}</td>
                  <td>
                    <button className="evaSelectBtn" onClick={() => onClickEvaUpdateHandler(eva.evaCode)}>수정</button>
                    <button className="evaDeleteBtn" onClick={() => evaDelete(eva.evaCode)}>삭제</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">평가 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>


        {adviceRegistModalVisible && (
          <AdviceRegistModal
            adviceRegist={selectedRegistAdvice}
            setAdviceRegistModal={setAdviceRegistModalVisible}
            stuCode={stuCode}
            studyInfoCode={studyInfoCode}
            empCode={empCode}
          />
        )}

        {adviceUpdateModalVisible && (
          <AdviceUpdateModal
            adviceLogCode={selectedUpdateAdvice}
            setAdviceUpdateModal={setAdviceUpdateModalVisible}
            stuCode={stuCode}
            studyInfoCode={studyInfoCode}
            empCode={empCode}
          />
        )}

        {adviceReviewModalVisible && (
          <AdviceReviewModal
            adviceReview={selectedAdviceReview}
            setAdviceReviewModal={setAdviceReviewModalVisible}
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
                  <td onClick={() => onClickAdviceReviewHandler(advice)}>{advice.adviceLogCode}</td>
                  <td onClick={() => onClickAdviceReviewHandler(advice)}>{advice.writer.empName}</td>
                  <td onClick={() => onClickAdviceReviewHandler(advice)}>{advice.adviceLogDate}</td>
                  <td>
                    <button className="studyStuUpdateBtn" onClick={() => onClickAdviceUpdateHandler(advice.adviceLogCode)}>수정</button>
                    <button className="studyStuDeleteBtn" onClick={() => adviceDelete(advice.adviceLogCode)}>삭제</button>
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