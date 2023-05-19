import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/common/Header";
import './Abs.css';
import { callMyAbsListAPI, callAbsDateAPI, callCheckInAPI, callCheckOutAPI } from '../../apis/AbsAPICalls';
import MyAbsList from '../../component/lists/MyAbsList';
import PagingBar from "../../component/common/PagingBar";
import Swal from "sweetalert2";


function Abs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const abs = useSelector(state => state.absReducer);
    const myAbsList = abs.data || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* 타이머 */
    const [isWorking, setIsWorking] = useState(false);
    const [workTime, setWorkTime] = useState(0);

    useEffect(() => {
        let timer;

        const startTime = localStorage.getItem('startTime');
        if (startTime && !isNaN(Date.parse(startTime)) && !isWorking) {
            const elapsedTime = Math.floor((new Date().getTime() - new Date(startTime).getTime()) / 1000);
            setIsWorking(true);
            setWorkTime(elapsedTime);
        }

        if (isWorking) {
            timer = setInterval(() => {
                setWorkTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (timer) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isWorking]);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
        const seconds = timeInSeconds - (hours * 3600) - (minutes * 60);

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };


    useEffect(() => {
        dispatch(callMyAbsListAPI({ currentPage }));
    }, [dispatch, currentPage]);

    const handleReloadPage = () => {
        navigate('/abs', { replace: true });
        window.location.reload();
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSearchDate = () => {
        if (selectedDate) {
            dispatch(callAbsDateAPI({ absDate: selectedDate, currentPage }));
        }
    };

    const handleCheckIn = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayDate = `${year}-${month}-${day}`;
        const hasCheckedIn = myAbsList.some(abs => abs.absDate === todayDate && abs.absStart !== null);
        const hasCheckedOut = myAbsList.some(abs => abs.absDate === todayDate && abs.absEnd !== null);

        if (hasCheckedOut) {
            Swal.fire({
                title: '이미 퇴근했습니다',
                text: '퇴근 시간을 확인하세요',
                icon: 'warning',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'custom-ok-button',
                },
                confirmButtonColor: '#8CBAFF',
            });
        } else if (hasCheckedIn) {
            Swal.fire({
                title: '이미 출근했습니다',
                text: '출근 시간을 확인하세요',
                icon: 'warning',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'custom-ok-button',
                },
                confirmButtonColor: '#8CBAFF',
            });
        } else {
            Swal.fire({
                /* title: '근태 시간을 수정하시겠습니까?',*/
                text: '출근 시간을 등록하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                customClass: {
                    confirmButton: 'custom-confirm-button',
                    cancelButton: 'custom-cancel-button'
                },
                confirmButtonColor: '#8CBAFF',
                cancelButtonColor: '#DADADA',
                confirmButtonText: '등록',
                cancelButtonText: '취소',
                reverseButtons: true,
                buttonsStyling: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await dispatch(callCheckInAPI());
                        localStorage.setItem('startTime', new Date().toString()); // 출근 버튼을 누른 시간 저장
                        setIsWorking(true);
                        setWorkTime(0);
                        Swal.fire({
                            title: '등록 완료',
                            text: '출근 시간을 확인하세요.',
                            icon: 'success',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'custom-success-button'
                            },
                        });
                    } catch (error) {
                        Swal.fire(
                            '등록 실패',
                            '다시 시도하세요.',
                            'error'
                        );
                    }
                }
            });
        }
    };

    const handleCheckOut = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayDate = `${year}-${month}-${day}`;
        const hasCheckedIn = myAbsList.some(abs => abs.absDate === todayDate && abs.absStart !== null);
        const hasCheckedOut = myAbsList.some(abs => abs.absDate === todayDate && abs.absEnd !== null);

        if (!hasCheckedIn) {
            Swal.fire({
                title: '출근 기록이 없습니다',
                text: '출근 시간을 먼저 등록하세요',
                icon: 'warning',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'custom-ok-button',
                },
                confirmButtonColor: '#8CBAFF',
            });
        } else if (hasCheckedOut) {
            Swal.fire({
                title: '이미 퇴근했습니다',
                text: '퇴근 시간을 확인하세요',
                icon: 'warning',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'custom-ok-button',
                },
                confirmButtonColor: '#8CBAFF',
            });
        } else {
            Swal.fire({
                /* title: '근태 시간을 수정하시겠습니까?',*/
                text: '퇴근 시간을 등록하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                customClass: {
                    confirmButton: 'custom-confirm-button',
                    cancelButton: 'custom-cancel-button'
                },
                confirmButtonColor: '#8CBAFF',
                cancelButtonColor: '#DADADA',
                confirmButtonText: '등록',
                cancelButtonText: '취소',
                reverseButtons: true,
                buttonsStyling: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await dispatch(callCheckOutAPI());
                        localStorage.removeItem('startTime'); // 퇴근 버튼을 누르면 startTime 제거
                        setIsWorking(false);
                        Swal.fire({
                            title: '등록 완료',
                            text: '퇴근 시간을 확인하세요.',
                            icon: 'success',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'custom-success-button'
                            },
                        });
                    } catch (error) {
                        Swal.fire(
                            '등록 실패',
                            '다시 시도하세요.',
                            'error'
                        );
                    }
                }
            });
        }
    };

    return (
        <>
            <Header title="근태" />

            <div className="abs-wrapp">
                <div className="abs-menu-bar">
                    <NavLink to="/abs">
                        <div className="abs-menu" onClick={handleReloadPage}>
                            내 근태
                        </div>
                    </NavLink>

                    <NavLink to="/abs/adminAbs">
                        <div className="abs-menu" style={{ color: 'gray' }}>
                            구성원 근태
                        </div>
                    </NavLink>
                </div>

                <div className="abs-btns">
                    <button className="abs-start-btn" onClick={handleCheckIn}>
                        출근하기
                    </button>
                    <button className="abs-end-btn" onClick={handleCheckOut}>
                        퇴근하기
                    </button>
                </div>

                {/*타이머 */}
                <div className="abs-timer">
                    {formatTime(workTime)}
                </div>

                <div className="abs-search-container">
                    <input className="abs-searchDate"
                        type="date"
                        name="selectDate"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <button className="abs-SearchBtn"
                        onClick={handleSearchDate}>
                        <img src="/images/search.png" alt="검색" />
                    </button>
                </div>

                <div>
                    {myAbsList && <MyAbsList myAbsList={myAbsList} />}
                </div>
                <div>
                    {abs.pageInfo && <PagingBar pageInfo={abs.pageInfo} setCurrentPage={setCurrentPage} />}
                </div>

            </div>


        </>
    );
}

export default Abs;