import React from "react";
import {NavLink} from "react-router-dom";

function HeaderItem(props) {
	return (
		<li>
			<NavLink exact to={props.link}>
				{props.icon}
				<span>{props.text}</span>
			</NavLink>
		</li>
	);
}

export default HeaderItem;