import React from "react";

function DescriptionItem(props) {
	//const id = props._id;

	return (
		<div className="calendar-selected-item">
			<span className="calendar-selected-time">{props.hour && props.hour}</span>
			<div className="calendar-selected-desc">
				<h5>{props.title}</h5>
				<p>{props.description}</p>
			</div>
		</div>
	);
}

export default DescriptionItem;
