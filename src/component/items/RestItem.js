import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callUpdateRestStateAPI } from '../../apis/EmpAPICalls';
import './RestItem.css';
import Swal from "sweetalert2";

function RestItem({ rest }) {
  const dispatch = useDispatch();

  let statusColor;
  switch (rest.restState) {
    case "대기":
      statusColor = "#AAAAAA";
      break;
    case "반려":
      statusColor = "#FFA9B0";
      break;
    case "승인":
      statusColor = "#8CBAFF";
      break;
    default:
      statusColor = "#AAAAAA";
      break;
  }


  const onRestApplyClickHandler = (e) => {
    const form = {
      restCode: rest.restCode,
      restState: e.target.value
    };
    Swal.fire({
      text: '처리하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
      },
      confirmButtonColor: '#8CBAFF',
      cancelButtonColor: '#DADADA',
      confirmButtonText: '저장',
      cancelButtonText: '취소',
      reverseButtons: true,
      buttonsStyling: false,
    }).then((result) => { 
      if (result.isConfirmed) {
        dispatch(callUpdateRestStateAPI(form))
          .then(() => {
            Swal.fire({
              title: '휴직처리 완료',
              text: '변경 사항을 확인하세요.',
              icon: 'success',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'custom-success-button'
              }
            });
          })
          .catch((error) => {
            Swal.fire(
              '저장 실패',
              '다시 시도하세요.',
              'error'
            );
          });
      }
    });
    
  }



  return (
    <>
      <tr>
        <td>{rest.employee.dept.deptName}</td>
        <td>{rest.employee.job.jobName}</td>
        <td>{rest.employee.empName}</td>
        <td>{rest.restStart}</td>
        <td>{rest.restEnd}</td>
        <td>{rest.restMemo}</td>
        <td>
          <button 
          className="empRestSignStatus" style={{ backgroundColor: statusColor }}
          >
 
            {rest.restState}
          </button>
        </td>
        <td>
          <button
            className="empRestSignStatusApply"
            name="restState"
            value="승인"
            onClick={onRestApplyClickHandler}
          >
            승인하기
          </button>
          <button
            className="empRestSignStatusReturn"
            name="restState"
            value="반려"
            onClick={onRestApplyClickHandler}
          >
            반려하기
          </button>
        </td>
      </tr>
    </>
  )
}

export default RestItem;