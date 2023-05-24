import React, { useRef, useState } from "react";
import CSS from "./BoardRegistModal.module.css";
import { useDispatch } from "react-redux";
import { callBoardRegistAPI } from "../../apis/BoardAPICall";
import { useNavigate } from "react-router";


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




  /* 공지 등록하기 버튼 클릭 이벤트 */
  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  }

  const onClickBoardRegistrationHandler = () => {
    const formData = new FormData();
    /* 서버로 전달할 FormData 형태의 객체 설정 */
    formData.append("noticeTitle", form.noticeTitle);
    formData.append("noticeContent", form.noticeContent);
    // FormData에 파일 추가
    selectedFiles.forEach((file, index) => {
      formData.append(`noticeFile[${index}]`, file);
    });

    console.log(formData);


    dispatch(callBoardRegistAPI(formData));

    // 모달 닫기
    onRegistClose(); 

    // 페이지 새로고침
    window.location.reload();
  }





  return (
    isRegistOpen && (
      <div className={CSS.modal} onClick={handleBackgroundClick}>
        <div className={CSS.modalContainer} onClick={handleModalClick}>
          <div className={CSS.close} onClick={onRegistClose}>
            X
          </div>
          <div className={CSS.edgeContainer}>
            <ul style={{ display: "flex" }}>
              <li className={CSS.boardContentImg}>
                <img
                  src="/images/공지내용.png"
                  className={CSS.fileImg}
                  alt="공지내용이미지"
                  onClick={handleImageClick}
                />
              </li>
              <li className={CSS.boardContent}>제목</li>
            </ul>
            <input
              className={CSS.title}
              name="noticeTitle"
              onChange={onChangeHandler}
            ></input>
            <ul style={{ display: "flex" }}>
              <li className={CSS.boardContentImg}>
                <img
                  src="/images/공지내용.png"
                  className={CSS.fileImg}
                  alt="공지내용이미지"
                  onClick={handleImageClick}
                />
              </li>
              <li className={CSS.boardContent}>공지내용</li>
            </ul>
            <textarea
              className={CSS.content}
              name="noticeContent"
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
