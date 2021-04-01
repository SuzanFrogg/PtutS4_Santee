import React, { useState } from "react";
import { ReactComponent as Lock } from "../../media/icons/lock.svg";
import { ReactComponent as Success1 } from "../../media/icons/success/1_blood_drop.svg";
import { ReactComponent as Success2 } from "../../media/icons/success/2_nurse.svg";
import { ReactComponent as Success3 } from "../../media/icons/success/3_blood_bag.svg";
import { ReactComponent as Success4 } from "../../media/icons/success/4_dracula.svg";
import { ReactComponent as Success5 } from "../../media/icons/success/5_good_sleep.svg";
import { ReactComponent as Success6 } from "../../media/icons/success/6_regular.svg";
import { ReactComponent as Success7 } from "../../media/icons/success/7_insomnia.svg";
import { ReactComponent as Success8 } from "../../media/icons/success/8_pain.svg";
import { ReactComponent as Success9 } from "../../media/icons/success/9_chance.svg";
import { ReactComponent as Success12 } from "../../media/icons/success/12_virusmon.svg";

function Success(props) {
	const [test, setTest] = useState(<Lock />);
	//Pour pouvoir choisir la bonne icone
	const getIcon = (id) => {
		return {
			"606572dfc4f10e24687ed03d": Success1,
			"606572dfc4f10e24687ed03e": Success2,
			"606572dfc4f10e24687ed03f": Success3,
			"606572dfc4f10e24687ed040": Success4,
			"606572dfc4f10e24687ed041": Success5,
			"606572dfc4f10e24687ed042": Success6,
			"606572dfc4f10e24687ed043": Success7,
			"606572dfc4f10e24687ed044": Success8,
			"606572dfc4f10e24687ed045": Success9,
			/*"606572dfc4f10e24687ed046": Success10,
			"606572dfc4f10e24687ed047": Success11,*/
			"606572dfc4f10e24687ed048": Success12
		}[id];
	}

	let icon = getIcon(props.id);
	let IconComponent = getIcon(props.id) ? icon : Lock;
	return (
		<li className="success-item">
			<div className="tooltip">
				<span className="tooltiptext">{props.desc}</span>
				<div className="success-icon">{props.lock ? <Lock /> : <IconComponent />}</div>
				<p>{props.name}</p>
			</div>
		</li>
	);
}

export default Success;