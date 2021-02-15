let accessToken = "";

function getAccessToken() {
	return accessToken;
}

function setAccessToken(newAccessToken) {
	accessToken = newAccessToken;
}

export {getAccessToken, setAccessToken};