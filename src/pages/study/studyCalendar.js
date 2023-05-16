function DateHeader() {

	const dateToArray = (dates) => {
		if (Array.isArray(dates)) {
			return dates
		} else if (typeof dates === "string") {
			return dates.split(',')
		} else {
			return ["일", "월", "화", "수", "목", "금", "토"]
		}
	}

	const mapArrayToDate = (dateArray) => {
		try {
			if (dateArray.length !== 7) {
				console.log(new Error("dates props must be had 7 date"))
				dateArray = ["일", "월", "화", "수", "목", "금", "토"]
			}

			return dateArray.map((date, index) => {
				const className = () => {
					let className = "RCA-calendar-date-component";
					if (index === 0) {
						return className + " date-sun"
					} else if (index === 6) {
						return className + " date-sat"
					} else {
						return className + " date-weekday"
					}
				}
				return (
					<div className = {className()} key = {"RCA-header-" + date}>
						{date}
					</div>
				)
			})
		} catch {
			throw new Error("date must be string or component")
		}
	}

	return (
		<div className = "RCA-calendar-date-header">
			{mapArrayToDate(dateToArray(this.props.dates))}
		</div>
	);
}

export default DateHeader;
