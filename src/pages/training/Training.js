import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../component/common/Header";
import CSS from "./Training.module.css";

function Training() {

	const title = '과정';
	const subTitle = '과정 목록';
	const [search, setSearch] = useState();
	const navigate = useNavigate();

	const onChangeHandler = (e) => {
		setSearch(e.target.value);
	}

	const onKeyDownHandler = (e) => {
		if (e.key === 'Enter') {
			navigate(`/search?value=${search}`);
		}
	}

	return (
		<>
			<Header title = {title} subTitle = {subTitle}/>
			<div className = {CSS.HeaderDiv}>
				<input
					className = {CSS.InputStyle}
					onChange = {onChangeHandler}
					onKeyDown = {onKeyDownHandler}
					type = "text"
					placeholder = "검색"
				>
				</input>
				안녕
			</div>
		</>
	)
}

export default Training;