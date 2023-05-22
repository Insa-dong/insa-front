import React, { useRef, useState } from "react";
import CSS from "./BoardRegistModal.module.css";

function BoardRegistModal({ isRegistOpen, onRegistClose }) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleBackgroundClick = () => {
    onRegistClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const getDisplayedFileNames = () => {
    if (selectedFiles.length > 3) {
      return `파일 ${selectedFiles.length}개`;
    } else {
      return selectedFiles.map((file) => file.name).join(", ");
    }
  };

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
            <input className={CSS.title} name="noticeTitle"></input>
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
            <input className={CSS.content} name="noticeContent"></input>
            <div>
              <img
                src="/images/파일첨부.png"
                className={CSS.fileImgg}
                alt="파일첨부이미지"
                onClick={handleImageClick}
              />
              <input
                ref={fileInputRef}
                className={CSS.file}
                multiple="multiple"
                type="file"
                name="files"
                style={{ display: "none" }}
                onChange={handleFileChange}
              ></input>
              <p className={CSS.selectedFileNames}>
                {getDisplayedFileNames()}
              </p>
            </div>
            <button className={CSS.ButtonStyle2}>등록하기</button>
          </div>
        </div>
      </div>
    )
  );
}

export default BoardRegistModal;
