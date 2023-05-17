import './Student.css';
import './StudentRegistration.css';
import Header from "../../component/common/Header";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callStudentRegistAPI } from '../../apis/StudentAPICalls';

function StudentRegistration() {

    const title = '수강생';
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const { regist } = useSelector(state => state.studentReducer);

    console.log(regist);

    useEffect(
        () => {
            if (regist?.status === 200) {
                alert('수강생 등록이 완료 되었습니다.');
                navigate('/student', { replace: true });
            }
        },
        [regist]
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const onClickStudentRegistrationHandler = () => {
        dispatch(callStudentRegistAPI(form))
    };

    return (
        <>
            <div className="stuRegist">
                <Header title={title} />
                <table>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input className="stuRegistBox"
                                    type="text"
                                    placeholder='이름을 입력해주세요'
                                    name="stuName"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>영문 이름</th>
                            <td>
                                <input className="stuRegistBox"
                                    type="text"
                                    placeholder='영문이름을 입력해주세요'
                                    name="stuEngName"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>휴대폰</th>
                            <td>
                                <input className="stuRegistBox"
                                    type="text"
                                    placeholder='휴대폰 번호를 입력해주세요'
                                    name="stuPhone"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input className="stuRegistBox"
                                    type="text"
                                    placeholder='이메일을 입력해주세요'
                                    name="stuEmail"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td>
                                <input className="stuRegistBox"
                                    type="date"
                                    name="stuBirth"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>학력</th>
                            <td>
                                <input className="stuRegistBox"
                                    type="text"
                                    placeholder='학력을 입력해주세요'
                                    name="stuEndSchool"
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br></br><br></br>
                <button className="stuRegistEntBtn"
                    onClick={onClickStudentRegistrationHandler}>등록하기</button>
                <br></br>
                <button className="beforeBtn"
                    onClick={() => navigate(-1)}>
                    이전으로</button>
            </div>
        </>
    );
}

export default StudentRegistration;