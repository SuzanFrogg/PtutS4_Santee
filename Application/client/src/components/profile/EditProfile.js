import React, { useState } from "react";

function EditProfile(props) {
	const [pseudo, setPseudo] = useState(props.user.pseudo);

	return (
		<>
			<img className="profile-picture" src={`./uploads/profil/${props.user.picture}`} alt="profil" />
			<input 
				type="text" 
				id="name"
				value={pseudo}
				onChange={(event) => setPseudo(event.target.value)}
			/>

			<div className="profile-info">
				<div className="profile-details-box profile-vaccines">
					<h3>Vaccins</h3>
					<ul>
						{props.vaccines && props.vaccines.map((vaccine, key) => {
							return (
								<input 
									type="text" 
									id="name"
									value={vaccine.name}
									onChange={(event) => "setPseudo(event.target.value)"}
								/>
							)
						})}
					</ul>
				</div>

				<div className="profile-details-box profile-allergies">
					<h3>Allergies</h3>
					<ul>
						{props.allergies && props.allergies.map((allergy, key) => {
							return <li key={key}>{allergy.toAvoid}</li>
						})}
					</ul>
				</div>
			</div>
		</>
	)
}

export default EditProfile;