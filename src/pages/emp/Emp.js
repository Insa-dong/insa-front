import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/common/Header";
import EmpOrg from "./EmpOrg";
import EmpManage from "./EmpManage";

function Emp() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState('조직도');

  const headerClick = (page) => {
    setSelectedPage(page);
  };

  const selectPage = () => {
    if (selectedPage === '조직도') {
      return <EmpOrg />;
    } else if (selectedPage === '구성원관리') {
      return <EmpManage />;
    }

    return <EmpOrg />;
  };

  return (
    <>
      <Header
        title="조직도"
        subTitle="구성원관리"
        onClick={headerClick}
      />
      <div>{selectPage()}</div>
    </>
  );
}

export default Emp;
