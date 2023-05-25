import './OffComingItem.css';
import { callCencelOffAPI } from '../../apis/OffAPICalls';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";

function OffComingItem({ off: { signCode, offDiv, offStart, offEnd, offDay, signStatus } }) {

    let imgSrc = "/images/연차신청.png";

    if (offDiv === "오전반차" || offDiv === "오후반차") {
        imgSrc = "/images/반차신청.png";
    }

    let statusColor;
    switch (signStatus) {
        case "대기":
            statusColor = "#AAAAAA";
            break;
        case "반려":
            statusColor = "#FFA9B0";
            break;
        case "승인":
            statusColor = "#8CBAFF";
            break;
    }

    const dispatch = useDispatch();

    const onClickHandleCancel = () => {

        Swal.fire({
        text: '해당 연차 신청을 삭제 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'custom-confirm-button',
          cancelButton: 'custom-cancel-button',
        },
        confirmButtonColor: '#8CBAFF',
        cancelButtonColor: '#DADADA',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        reverseButtons: true,
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch(callCencelOffAPI({signCode}))
            .then(() => {
                Swal.fire({
                    title: '삭제 완료',
                    text: '예정 연차를 확인하세요.',
                    icon: 'success',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'custom-success-button'
                    }
                });
            })
                .catch((error) => {
                    Swal.fire(
                        '신청 실패',
                        '다시 시도하세요.',
                        'error'
                    );
                });
        }
    });


    }

    return (
       
        <tr className="comingOffDiv">
            <td className="td-img">
                <img className="offDivImg" alt="offDivImg" src={imgSrc}/>
            </td>
            <td className="td-div">{offDiv}</td>
            <td className="td-start">{offStart}  ~ </td>
            <td className="td-end">{offEnd}</td>
            <td className="td-day">{offDay}일</td>
            <td className="td-signStatus" style={{backgroundColor: statusColor}}>{signStatus}</td>
            <td className="td-cancel">
                <button className='offcancel' onClick={onClickHandleCancel} >신청취소</button>
            </td>
        </tr>
       
    )
}

export default OffComingItem;