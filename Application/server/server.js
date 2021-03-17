/*---App configuration---*/
import "dotenv/config.js";
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import sleepRoutes from "./routes/sleep.routes.js";
import vaccinesRoutes from "./routes/vaccines.routes.js";
import weightRoutes from "./routes/weight.routes.js";
import successRoutes from "./routes/success.routes.js";
import allergyRoutes from "./routes/allergy.routes.js";
import periodsRoutes from "./routes/periods.routes.js";
import donRoutes from "./routes/don.routes.js";
import astuceRoutes from "./routes/astuce.routes.js";
import objectivesRoutes from "./routes/objectives.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import userModel from "./models/user.model.js";

/*---DB configuration---*/
import "./config/db.js";

/*---App configuration---*/
//On autorise seulement le client à faire des requêtes au backend
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
app.post("/refresh_token", async (req, res) => {
	const token = req.cookies.jwt;
	if (!token) return res.status(400).json({ accessToken: "", userId: "" });

	//On vérifie que le token est valide
	let payload = null;
	try {
		payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
	} catch (err) {
		return res.status(400).json({ accessToken: "", userId: "" });
	}

	const user = await userModel.findById({ _id: payload.id });
	if (!user) return res.status(400).json({ accessToken: "", userId: "" });

	const accessToken = await user.getAccessToken();
	const userId = user._id;
	const expiresIn = 60*1000; //60s
	return res.status(200).json({ accessToken, userId, expiresIn });
});
app.get("*", authMiddleware.checkUser);

/*---Routes API---*/
app.use("/api/user", userRoutes); //Route de l'utilisateur
app.use("/api/sleep", sleepRoutes); //Route de sleep
app.use("/api/vaccines", vaccinesRoutes); //Route de vaccines
app.use("/api/weight",weightRoutes); //Route de weight
app.use("/api/success",successRoutes); //Route de success
app.use("/api/allergy",allergyRoutes); //Route de allergy
app.use("/api/don",donRoutes); //Route de don
app.use("/api/objectives",objectivesRoutes); //Route de don
app.use("/api/astuce",astuceRoutes); //Route de astuce
app.use("/api/periods", authMiddleware.checkUser, periodsRoutes); //Route des régles

/*---Server listener---*/
app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});