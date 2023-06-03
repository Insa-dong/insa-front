import React, { useRef, useState } from "react";
import CSS from "./BoardRegistModal.module.css";
import { useDispatch } from "react-redux";
import { callBoardRegistAPI } from "../../apis/BoardAPICall";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


function BoardRegistModal({ isRegistOpen, onRegistClose }) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackgroundClick = () => {
    onRegistClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };


  const handleClearFile = (fileName) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const renderFiles = () => {
    return selectedFiles.map((file) => (
      <div key={file.name}>
        {file.name}
        <button onClick={() => handleClearFile(file.name)}>X</button>
      </div>
    ));
  };

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }




  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  }

  /* 공지 등록하기 버튼 클릭 이벤트 */
  const onClickBoardRegistrationHandler = () => {
    const formData = new FormData();
    /* 서버로 전달할 FormData 형태의 객체 설정 */
    formData.append("noticeTitle", form.noticeTitle);
    formData.append("noticeContent", form.noticeContent);
    // FormData에 파일 추가
    selectedFiles.forEach((file, index) => {
      formData.append(`noticeFile[${index}]`, file);
    });
    Swal.fire({
      text: '등록 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
      },
      confirmButtonColor: '#8CBAFF',
      cancelButtonColor: '#DADADA',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      reverseButtons: true,
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(callBoardRegistAPI(formData));
        Swal.fire({
          title: '등록 완료',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'custom-success-button'
          }
        })
          .then(() => {
            onRegistClose();
            window.location.reload();
          })
      }
    });
  }





  return (
    isRegistOpen && (
      <div className={CSS.modal} onClick={handleBackgroundClick}>
        <div className={CSS.modalContainer} onClick={handleModalClick}>
          <div className={CSS.close} onClick={onRegistClose}>
            X
          </div>
          <div className={CSS.edgeContainer}>
            <div className={CSS.boardTitle}>📋 공지등록</div>
            <div className={CSS.boardContent}>✒️ 제목</div>
            <input
              className={CSS.title}
              name="noticeTitle"
              autoComplete='off'
              onChange={onChangeHandler}
            ></input>
            <div className={CSS.boardContent}>📰 내용</div>
            <textarea
              className={CSS.content}
              name="noticeContent"
              autoComplete='off'
              onChange={onChangeHandler}
            ></textarea>
            <div className={CSS.fileContainer} style={{ display: "flex" }} onClick={handleImageClick}>
              <img
                src="/images/파일첨부.png"
                className={CSS.fileImgg}
                alt="파일첨부이미지"
              />
              <div className={CSS.fileattach}>파일첨부</div>
            </div>
            <input
              ref={fileInputRef}
              className={CSS.file}
              multiple="multiple"
              type="file"
              name="noticeFile"
              style={{ display: "none" }}
              onChange={handleFile}
            ></input>
            <div className={CSS.selectedFileNames}>{renderFiles()}</div>
            <button
              className={CSS.ButtonStyle2}
              onClick={onClickBoardRegistrationHandler}

            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default BoardRegistModal;
