import { useEffect, useState } from "react";
import './StudentDetail.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callStudentDetailForAdminAPI, callStudentUpdateAPI } from "../../apis/StudentAPICalls";
import Header from "../../component/common/Header";
import { callStudentEvaListAPI } from "../../apis/EvaAPICalls";
import { callStudentAdviceListAPI } from "../../apis/AdviceAPICalls";
import { callStudyStuListAPI } from "../../apis/StudyStuAPICalls";


function StudentDetail() {

    const title = '수강생';
    const dispatch = useDispatch();
    const params = useParams();
    const stuCode = params.stuCode;
    const navigate = useNavigate();
    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});
    const data = useSelector(state => state.studentReducer);
    const { modify } = useSelector(state => state.studentReducer);
    const [currentPage, setCurrentPage] = useState();
    const {studyList , studyPageInfo} = useSelector(state => state.studyStudentReducer);
    const {adviceList, advicePageInfo} = useSelector(state => state.adviceReducer);
    const {evaList, evaPageInfo} = useSelector(state => state.evaReducer);
  
    useEffect(
        ()=> {
            dispatch(callStudentDetailForAdminAPI({stuCode}));
            dispatch(callStudyStuListAPI({ stuCode, currentPage }));
            dispatch(callStudentEvaListAPI({ stuCode, currentPage }));
            dispatch(callStudentAdviceListAPI({ stuCode, currentPage }));
        },
        [currentPage]
    );

    useEffect(
        () => {
            if (modify?.status === 200) {
                alert('수강생 정보 수정이 완료 되었습니다.');
            }
        },
        [modify]
    );


    /* 수정 모드 변경 */
    const onClickmodifyModeHandler = () => {
        setModifyMode(true);
        setForm({...data});
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    /* 수정 저장 버튼 클릭 이벤트 */
    const onClickStudentUpdateHandler = () => {
        
        const formData = new FormData();

        // formData.append("stuCode", form.stuCode);
        // formData.append("stuName", form.stuName);
        // formData.append("stuEngName", form.stuEngName);
        // formData.append("stuBirth", form.stuBirth);
        // formData.append("stuEndSchool", form.stuEndSchool);
        // formData.append("stuEmail", form.stuEmail);
        // formData.append("stuPhone", form.stuPhone);
      
        dispatch(callStudentUpdateAPI(formData));
    }

      return (
        <>
          <Header title={title} />
          {data && (
            <>
              <table>
                <tbody>
                <tr>
                    <td>이름</td>
                    <td>
                        <input className="stuDetailBox"
                        name='stuName'
                        type='text'
                        onChange={onChangeHandler}
                        value={!modifyMode ? (data.stuName || "") : form.stuName}
                        readOnly={!modifyMode}
                        />
                    </td>
                    </tr>
                    <tr>
                    <td>영문이름</td>
                    <td>
                        <input className="stuDetailBox"
                        name='stuEngName'
                        type='text'
                        onChange={onChangeHandler}
                        value={!modifyMode ? (data.stuEngName || "") : form.stuEngName}
                        readOnly={!modifyMode}
                        />
                    </td>
                    </tr>
                    <tr>
                    <td>생년월일</td>
                    <td>
                        <input className="stuDetailBox"
                        name='stuBirth'
                        type='date'
                        onChange={onChangeHandler}
                        value={!modifyMode ? (data.stuBirth || "") : form.stuBirth}
                        readOnly={!modifyMode}
                        />
                    </td>
                    </tr>
                    <tr>
                    <td>학력</td>
                    <td>
                        <input className="stuDetailBox"
                        name='stuEndSchool'
                        type='text'
                        onChange={onChangeHandler}
                        value={!modifyMode ? (data.stuEndSchool || "") : form.stuEndSchool}
                        readOnly={!modifyMode}
                        />
                    </td>
                    </tr>
                    <tr>
                    <td>이메일</td>
                    <td>
                        <input className="stuDetailBox"
                        name='stuEmail'
                        type='text'
                        onChange={onChangeHandler}
                        value={!modifyMode ? (data.stuEmail || "") : form.stuEmail}
                        readOnly={!modifyMode}
                        />
                    </td>
                    </tr>
                    <tr>
                    <td>전화번호</td>
                    <td>
                        <input className="stuDetailBox"
                        name='stuPhone'
                        type='text'
                        onChange={onChangeHandler}
                        value={!modifyMode ? (data.stuPhone || "") : form.stuPhone}
                        readOnly={!modifyMode}
                        />
                    </td>
                    </tr>

                </tbody>
              </table>
              <br></br>
              {!modifyMode && 
            <button className="stuDetailUpdateBtn"
                onClick={ onClickmodifyModeHandler }
            > 
                수정하기
            </button>}
            {modifyMode && 
                <button className="stuDetailUpdateBtn"
                    onClick={ onClickStudentUpdateHandler}
                >
                    수정
                </button>
            }
            </>
          )}   
           
        <h2 className = "studyHeader">과정 내역</h2>
        <table className = "stuDetailDiv"> 
            <thead>
            <tr>
                <th>과정 이름</th>
                <th>회차</th>
                <th>조회/삭제</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
            
        <h2 className = "studyHeader">평가 내역</h2>

        <table className = "stuDetailDiv">
            <thead>
            <tr>
                <th>평가 코드</th>
                <th>강의 이름</th>
                <th>강사명</th>
                <th>조회/삭제</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>

        <h2 className = "studyHeader">상담 내역</h2>

        <table className = "stuDetailDiv">
            <thead>
            <tr>
                <th>일지 코드</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회/삭제</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        </>
      );
    }
    

export default StudentDetail;