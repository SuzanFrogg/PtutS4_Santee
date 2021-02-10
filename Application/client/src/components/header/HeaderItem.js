import React from "react";
import {NavLink} from "react-router-dom";

function HeaderItem(props) {
	return (
		<li>
			<NavLink className="header-link" exact activeClassName="header-active" to={props.link}>
				<span>{props.text}</span>
			</NavLink>
		</li>
	);
}

export default HeaderItem;