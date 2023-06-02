import './Student.css';
import './StudentRegistration.css';
import Header from "../../component/common/Header";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callStudentRegistAPI } from '../../apis/StudentAPICalls';
import Swal from 'sweetalert2';

function StudentRegistration() {

    const title = '수강생';
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { regist } = useSelector(state => state.studentReducer);

    useEffect(() => {
        if (regist?.status === 200) {
          Swal.fire({
            text: '수강생 등록이 완료되었습니다.',
            icon: 'success',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'custom-success-button'
            }
          }).then(() => {
            navigate('/student', { replace: true }); // 이동
          });
        }
      }, [regist, navigate]);

    const validateForm = () => {
        const newErrors = {};

        // if (!form.stuName) {
        //     newErrors.stuName = '이름을 입력해주세요.';
        // }

        if (!form.stuEngName) {
            // newErrors.stuEngName = '영문 이름을 입력해주세요.';
        } else if(!/^[a-zA-Z\s]+$/.test(form.stuEngName)) {
            newErrors.stuEngName= '영문 이름만 입력해주세요.'
        } else {
            newErrors.stuEngName = '';
        }

        if (!form.stuPhone) {
            // newErrors.stuPhone = '전화번호를 입력해주세요.';
        } else if (!/^\d{2,3}-\d{3,4}-\d{3,4}$/.test(form.stuPhone)) {
            newErrors.stuPhone = '전화번호에 - 를 포함해주세요. '
        } else {
            newErrors.stuPhone = '';
        }

        if (!form.stuEmail) {
            // newErrors.stuEmail = '이메일을 입력해주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.stuEmail)) {
            newErrors.stuEmail = '유효한 이메일 주소를 입력해주세요.';
        } else {
            newErrors.stuEmail = '';
        }

        // if (!form.stuBirth) {
        //     newErrors.stuBirth = '생년월일을 입력해주세요.';
        // }

        // if (!form.stuEndSchool) {
        //     newErrors.stuEndSchool = '학력을 입력해주세요.';
        // }

        setErrors(newErrors);
        
        //return Object.keys(newErrors).length === 0;
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        validateForm();
    };

    const onClickStudentRegistrationHandler = () => {
        //  if (validateForm()) {
            dispatch(callStudentRegistAPI(form));
        // }
    };

    return (
        <>
            <Header title={title} />
            <div className="stuRegist">
                <h1>수강생 등록</h1>
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
                                {errors.stuName && <span className="error">{errors.stuName}</span>}
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
                                {errors.stuEngName && <span className="error">{errors.stuEngName}</span>}
                            </td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>
                                <input className="stuRegistBox"
                                    type="text"
                                    placeholder='전화번호를 입력해주세요'
                                    name="stuPhone"
                                    onChange={onChangeHandler}
                                />
                                {errors.stuPhone && <span className="error">{errors.stuPhone}</span>}
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
                                {errors.stuEmail && <span className="error">{errors.stuEmail}</span>}
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
                                {errors.stuBirth && <span className="error">{errors.stuBirth}</span>}
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
                                {errors.stuEndSchool && <span className="error">{errors.stuEndSchool}</span>}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="stuRegistBtnWrap">
                    <button className="stuRegistEntBtn"
                        onClick={onClickStudentRegistrationHandler}>등록하기
                    </button>

                    <button className="beforeBtn"
                        onClick={() => navigate(-1)}>
                        이전으로
                    </button>
                </div>

            </div>
        </>
    );

}

export default StudentRegistration;
