import express from "express";

import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/User.js";
import User from "../models/Users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// //VERIFY AUTHENTICATION
// router.get("/verifyauthentication", verifyToken, (req, res) => {
// 	res.send("You are logged in");
// });
// //VERIFY USER
// router.get("/verifyuser/:id", verifyUser, (req, res) => {
// 	res.send("You are logged in and can delete your account");
// });
// //VERIFY ADMIN
// router.get("/verifyadmin/:id", verifyAdmin, (req, res) => {
// 	res.send("You are admin and can delete all accounts");
// });

//CREATE
router.post("/", createUser);

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);
export default router;
