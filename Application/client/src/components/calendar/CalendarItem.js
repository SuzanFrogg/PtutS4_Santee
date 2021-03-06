import React, { useEffect, useState } from "react";
import useCalendar from "./useCalendar.js";
import {ReactComponent as ArrowIcon} from '../../media/icons/next-arrow.svg';
import axios from "axios";

//Dimanche correspond à 0 donc on le met en premier
const daysNames = [
	"Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi",
	"Vendredi", "Samedi"
];

const monthsNames = [
	"Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
	"Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function CalendarItem() {
	//Aujourd'hui (sans l'heure)
	let today = new Date();
	today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	const [selectedDate, setSelectedDate] = useState(today);
	const [currentDate, setCurrentDate] = useState(today);
	const [calendarData, setCalendarData] = useState({
		periods: [],
		event: []
	});

	useEffect(() => {
		const fetchPeriodsData = async (dateStart, dateEnd) => {
			const response = await axios.post("api/periods/findDate", { dateStart, dateEnd })
			
			setCalendarData((cData) => { return { ...cData, periods: response.data }});
		}

		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();
		let dateStart = new Date(year, month, 1);
		let dateEnd = new Date(year, month+1, 0);

		fetchPeriodsData(dateStart, dateEnd);
	}, [currentDate]);

	const getPrevMonth = () => {
		setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
	}

	const getNextMonth = () => {
		setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
	}

	/**
	 * Renvoie la date sous forme de string au format YYYY-MM-JJ
	 */
	 const getDateText = (date) => {
		let dayAsText = (date.getDate()<10) ? "0"+date.getDate() : ""+date.getDate();
		let monthAsText = ((date.getMonth()+1)<10) ? "0"+(date.getMonth()+1) : ""+(date.getMonth()+1);
		let yearAsText = ""+date.getFullYear();
	
		return yearAsText + "-" + monthAsText + "-" + dayAsText;
	}

	const getDateList = () => {
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();

		let listOfDays = [];
		for (let date = 1; date <= new Date(year, month+1, 0).getDate(); date++) {
			listOfDays.push(new Date(year, month, date));
		}
		let firstDayInMonth = new Date(year, month, 1).getDay();
		//Si le premier jour est un dimanche alors on renvoie 7 car le dimanche est à 0 de base
		firstDayInMonth = firstDayInMonth === 0 ? 7 : firstDayInMonth;
		//On rajoute les trous au début (car c'est les jours du précédent mois)
		listOfDays = Array(firstDayInMonth-1).fill(null).concat(listOfDays);
		
		return listOfDays.map((day, key) => {
			if (day) {
				let isSelected = day.getTime() === selectedDate.getTime();
				let isToday = day.getTime() === today.getTime();

				let classIsSelected = isSelected ? " calendar-day-selected" : "";
				let classIsToday = isToday ? " calendar-today" : "";
				let dateClass = "calendar-day" + classIsSelected + classIsToday;
				return (
					<time key={key} className={dateClass} dateTime={getDateText(day)} onClick={dateClickHandler}>
						<span>{day.getDate()}</span>
						<div className="calendar-day-info">
							{calendarData.periods.map((data, key) => {
								let dateStart = new Date(data.dateStart);
								let dateEnd = new Date(data.dateEnd);
								dateStart = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate());
								dateEnd = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate());
								if (day >= dateStart && day <= dateEnd)
									return <div key={key} className="calendar-day-info-periods"></div>;
							})}
						</div>
					</time>
				);
			}
			else {
				return <time key={key} className="calendar-day"></time>
			}
		});
	};
	
	const dateClickHandler = (date) => {
		let dateSplit = date.target.dateTime.split("-");
		setSelectedDate(new Date(dateSplit[0], parseInt(dateSplit[1])-1, parseInt(dateSplit[2])));
	}

	return (
		<div className="calendar-container">
			<section className="calendar-display">
				<div className="calendar-header">
					<button onClick={getPrevMonth}><ArrowIcon /></button>
					<h3>{monthsNames[currentDate.getMonth()] + " " + currentDate.getFullYear()}</h3>
					<button onClick={getNextMonth}><ArrowIcon /></button>
				</div>
				<div className="calendar-month">
					{getDateList()}
				</div>
			</section>
			<section className="calendar-selected-container">
				<h4>{daysNames[selectedDate.getDay()] + " "
				+ selectedDate.getDate() + " "
				+ monthsNames[selectedDate.getMonth()] + " "
				+ selectedDate.getFullYear()}</h4>
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