import PagingBarCSS from './PagingBarForCalendar.module.css';

function PagingBarForCalendar({pageInfo, setCurrentPage}) {

	const pageNumber = [];
	if (pageInfo) {
		for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
			pageNumber.push(i);
		}
	}
	
	return (
		<div className = {PagingBarCSS.productDiv}>
			<button
				className = {PagingBarCSS.pagingBtn}
				onClick = {() => setCurrentPage(pageInfo.currentPage - 1)}
				disabled = {pageInfo.currentPage <= 1}
			>
				&lt;
			</button>
			<ul className = {PagingBarCSS.productWrap}>
				{pageNumber.map(num => (
					<li key = {num}
					    onClick = {() => setCurrentPage(num)}
					>
						<button
							className = {PagingBarCSS.pagingBtn}
							style = {pageInfo.currentPage === num ? {color: '#8CBAFF'} : null}
						>
							{num}
						</button>
					</li>
				))
				}
			</ul>
			<button className = {PagingBarCSS.pagingBtn}
			        onClick = {() => setCurrentPage(pageInfo.currentPage + 1)}
			        disabled = {pageInfo.currentPage >= pageInfo.maxPage}
			>
				&gt;
			</button>
		</div>
	);
}

export default PagingBarForCalendar;