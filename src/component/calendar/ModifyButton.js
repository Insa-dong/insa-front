import {useSelector} from "react-redux";

function ModifyButton({setButtonClick}) {

	const {scheduleList} = useSelector(state => state.buttonReducer);

	console.log(scheduleList)

	return (
		<>
			{scheduleList && scheduleList.length > 0 &&
				<button onClick = {() => setButtonClick(true)}>변경사항 저장하기</button>}
		</>
	)
}

export default ModifyButton;