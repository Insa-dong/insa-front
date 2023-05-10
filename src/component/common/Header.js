import './Header.css';

function Header({title, subTitle}) {
	return (
		<div className = 'topHeader'>
			<h1 className = 'headerName'>{title}</h1>
			<h1 className = ' headerName2 '>{subTitle}</h1>
		</div>
	);
}

export default Header;