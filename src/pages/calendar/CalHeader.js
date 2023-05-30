import {useNavigate} from "react-router-dom";
import './CalHeader.css';

function CalHeader({title, subTitle}) {

	const navigate = useNavigate();

	return (
		<div className = 'topHeader'>
			<h1 className = 'headerName' onClick = {() => navigate(-1)}>{title}</h1>
			<h1 className = ' headerName2 '>{subTitle}</h1>
		</div>
	);
}

export default CalHeader;