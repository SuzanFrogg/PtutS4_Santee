import React from "react";
import useCalendar from "./useCalendar.js";
import {ReactComponent as ArrowIcon} from '../../media/icons/next-arrow.svg';

function CalendarItem() {
	const calendar = useCalendar();
	
	const dateClickHandler = (date) => {
		let dateSplit = date.target.dateTime.split("-");
		calendar.selectDate(dateSplit[0], dateSplit[1], dateSplit[2]);
	}

	return (
		<div className="calendar-container">
			<section className="calendar-display">
				<div className="calendar-header">
					<button onClick={calendar.getPrevMonth}><ArrowIcon /></button>
					<h3>{calendar.monthsNames[calendar.currentDate.getMonth()] + " " + calendar.currentDate.getFullYear()}</h3>
					<button onClick={calendar.getNextMonth}><ArrowIcon /></button>
				</div>
				<div className="calendar-month">
					{calendar.dateList && calendar.dateList.map((day, key) => {
						if (day) {
							let dateString = calendar.getDateText(day.fullDate);
							let classIsSelected = calendar.dateList[key].selected ? " calendar-day-selected" : "";
							let classIsToday = calendar.dateList[key].today ? " calendar-today" : "";
							let dateClass = "calendar-day" + classIsSelected + classIsToday;
							return (
								<time key={key} className={dateClass} dateTime={dateString} onClick={dateClickHandler}>
									<span>{parseInt(dateString.split("-")[2])}</span>
								</time>
							);
						}
						else {
							return <time key={key} className="calendar-day"></time>
						}
					})}
				</div>
			</section>
			<section className="calendar-selected-container">
				<h4>{calendar.daysNames[calendar.selectedDate.getDay()] + " "
				+ calendar.selectedDate.getDate() + " "
				+ calendar.monthsNames[calendar.selectedDate.getMonth()] + " "
				+ calendar.selectedDate.getFullYear()}</h4>
				<div className="calendar-selected-item">
					<span className="calendar-selected-time">20h52</span>
					<div className="calendar-selected-desc">
						<h5>Aller dans le module lunaire</h5>
						<p>Aller dans le module lunaire</p>
					</div>
				</div>
			</section>
		</div>
	)
}

export default CalendarItem;