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
            <div style={{ display: "flex" }}>
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
              <div className={CSS.selectedFileNames}>{renderFiles()}</div>
            </div>
            <button className={CSS.ButtonStyle2}>등록하기</button>
          </div>
        </div>
      </div>
    )
  );
}

export default BoardRegistModal;
