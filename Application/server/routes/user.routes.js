import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";

//Authentification
router.post("/register", authController.signUp); //CREATE
router.post("/login", authController.login);
router.get("/logout", authController.logout);

//User db
router.get("/", userController.getAllUsers); //READ
router.get("/:id", userController.userInfo); //READ
router.put("/:id", userController.updateUser); //UPDATE
router.delete("/:id", userController.deleteUser); //DELETE

export default router;