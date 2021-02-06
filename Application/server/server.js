/*---App configuration---*/
import "dotenv/config.js";
import express from "express";
const app = express();
import userRoutes from "./routes/user.routes.js";

/*---DB configuration---*/
import "./config/db.js";


/*---App configuration---*/
//Converti les requêtes entrantes en JSON (bodyParser)
app.use(express.json());
//Converti les requêtes entrantes en chaines de caractère ou liste (bodyParser)
app.use(express.urlencoded({ extended: true }));

/*---Routes API---*/
app.use("/api/user", userRoutes); //Route de l'utilisateur

/*---Server listener---*/
app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});