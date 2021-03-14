import { useState } from "react";
import axios from "axios";

//Dimanche correspond à 0 donc on le met en premier
const listDays = [
	"Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi",
	"Vendredi", "Samedi"
];

const listMonths = [
	"Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
	"Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function useCalendarData(initDate = new Date()) {
	let getPeriodsData = async (dateStart, dateEnd) => {
		const response = await axios.post("api/periods/findDate", { dateStart, dateEnd })
		return response.data;
	}
}


function useCalendar(initDate = new Date(), daysNames = listDays, monthsNames = listMonths) {
	//On remplace pour ne pas prendre l'heure en compte
	initDate = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate());
	const [selectedDate, setSelectedDate] = useState(initDate);
	const [currentDate, setCurrentDate] = useState(initDate);

	//Aujourd'hui (sans l'heure)
	let today = new Date();
	today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	//const day = currentDate.getDay();
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();

	
	let dateList = [];
	//Longueur du mois, mettre 0 au jour donne le dernier jour du mois précédent (donc on met +1 pour avoir l'actuel)
	const monthLength = new Date(year, month+1, 0).getDate();

	//Rempli la liste des dates du mois
	for (let date = 1; date <= monthLength; date++) {
		const fullDate = new Date(year, month, date);

		dateList.push({
			fullDate,
			selected: fullDate.getTime() === selectedDate.getTime(),
			today: fullDate.getTime() === today.getTime()
		});
	}

	let firstDayInMonth = new Date(year, month, 1).getDay();
	//Si le premier jour est un dimanche alors on renvoie 7 car le dimanche est à 0 de base
    firstDayInMonth = firstDayInMonth === 0 ? 7 : firstDayInMonth;
	//On rajoute les trous au début (car c'est les jours du précédent mois)
    dateList = Array(firstDayInMonth-1).fill(null).concat(dateList);

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

	const selectDate = (year, month, day) => {
		setSelectedDate(new Date(year, parseInt(month)-1, parseInt(day)));
	}

	return {
		dateList,
		daysNames,
		monthsNames,
		currentDate,
		selectedDate,
		getPrevMonth,
		getNextMonth,
		getDateText,
		selectDate
	}
}

export default useCalendar;