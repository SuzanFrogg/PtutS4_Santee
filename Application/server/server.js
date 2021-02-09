/*---App configuration---*/
import "dotenv/config.js";
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
import cors from "cors";

/*---DB configuration---*/
import "./config/db.js";

/*---App configuration---*/
//Autoriser seulement le client à faire des requêtes au backend
const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	"allowedHeaders": ["sessionId", "Content-Type"],
	"exposedHeaders": ["sessionId"],
	"methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
	"preflightContinue": false
}
app.use(cors(corsOptions));

//Converti les requêtes entrantes en JSON (bodyParser)
app.use(express.json());
//Converti les requêtes entrantes en chaines de caractère ou liste (bodyParser)
app.use(express.urlencoded({ extended: true }));

//Permet de pouvoir lire les cookies
app.use(cookieParser());

/*---jwt---*/
app.get("*", authMiddleware.checkUser);
app.get("/jwtid", authMiddleware.requireAuth, (req, res) => {
	res.status(200).send(res.locals.user._id);
})

/*---Routes API---*/
app.use("/api/user", userRoutes); //Route de l'utilisateur

/*---Server listener---*/
app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});