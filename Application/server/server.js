//Variables d'environnements
import "dotenv/config.js";
//Express.js
import express from "express";
//Charge la base de données
import "./config/db.js";

const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});