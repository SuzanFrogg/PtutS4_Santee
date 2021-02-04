//Variables d'environnements
import "dotenv/config.js";
//Express.js
import express from "express";
const app = express();
//Charge les routes de l'utilisateur
import userRoutes from "./routes/user.routes.js";
//Charge la base de données
import "./config/db.js";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/user", userRoutes); //Route de l'utilisateur

//Server
app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});