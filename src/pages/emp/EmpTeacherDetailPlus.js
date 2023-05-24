import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeacherNavbar from "../../component/common/TeacherNavbar";
import { useParams } from "react-router-dom";
import { callStudentDetailForAdminAPI } from "../../apis/StudentAPICalls";
import Header from "../../component/common/Header";
import CSS from './EmpTeacherDetailPlus.module.css';

function EmpTeacherDetailPlus() {

  const title = '수강생 상세조회'; 
  const params = useParams();
  const stuCode = params.stuCode;
  const { data } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();

  console.log('plusStuCode : ', stuCode);
  console.log('data : ', data);

  useEffect(() => {
    dispatch(callStudentDetailForAdminAPI({ stuCode }));
  }, [stuCode]);

  return (
    <>
      <TeacherNavbar />
      <Header title={title}/>
      <div className = {CSS.StuWrapper}>
      {data && (
        <>
          <table>
            <tbody>
              <tr>
                <td>이름</td>
                <td>{data.stuName}</td>
              </tr>
              <tr>
                <td>영문이름</td>
                <td>{data.stuEngName}</td>
              </tr>
              <tr>
                <td>생년월일</td>
                <td>{data.stuBirth}</td>
              </tr>
              <tr>
                <td>이메일</td>
                <td>{data.stuEmail}</td>
              </tr>
              <tr>
                <td>전화번호</td>
                <td>{data.stuPhone}</td>
              </tr>
            </tbody>
          </table>
          
        </>
         )} 
      </div>
    </>
  );
}

export default EmpTeacherDetailPlus;