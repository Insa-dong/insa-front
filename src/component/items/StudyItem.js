import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callStudyInfoListAPI} from "../../apis/StudyInfoAPICalls.js";
import listCSS from "../lists/TrainingList.module.css";
import CSS from "./TrainingItem.module.css";

function StudyItem({item, checkValue, setCheckValue, currentPage}) {

	const [hover, setHover] = useState(false);
	const [display, setDisplay] = useState({display: 'none'});
	const ref = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const studyInfo = useSelector(state => state.studyInfoReducer);


	useEffect(
		() => {
			dispatch(callStudyInfoListAPI({currentPage}));
		}, []
	)

	const onMouseOverHandler = () => {
		setHover(true);
		setDisplay({display: 'block'});
	}

	const onMouseOutHandler = () => {
		if (!ref.current.checked) {
			setDisplay({display: 'none'});
		}
		setHover(false);
	}

	const onClickHandler = () => {
		navigate(`/study/${checkValue}`);
	}

	const onCheckBoxClickHandler = () => {
		ref.current.checked = !ref.current.checked;
		setCheckValue(item.studyCode);
		setDisplay({display: 'block'});
	}

	const onChangeHandler = (e) => {
		e.target.checked = !e.target.checked;
		setCheckValue(item.studyCode)
	}

	return (
		<tr key = {item.studyCode}
		    className = {hover ? listCSS.BodyTrStyle : listCSS.BodyTrStyle2}
		    onMouseOver = {onMouseOverHandler}
		    onMouseOut = {onMouseOutHandler}
		    value = {item.studyCode}
		>
			<th onClick = {onCheckBoxClickHandler}>
				<input type = "checkbox"
				       ref = {ref}
				       className = {CSS.checkBox}
				       value = {item.studyCode}
				       onChange = {onChangeHandler}
				       style = {display}
				/>
				{`${item.training.trainingCode}-${item.training.trainingCount}-${item.studyCode}`}
			</th>
			<th onClick = {onClickHandler}>
				{item.studyTitle}
			</th>
			<th onClick = {onClickHandler}>
				{item.training.trainingTitle}</th>
			<th onClick = {onClickHandler}>
				{`${item.studyStartDate} ~ ${item.studyEndDate}`}
			</th>
			<th onClick = {onClickHandler}>
				{item.studyMaxPeople}
			</th>
		</tr>
	)

}

export default StudyItem;