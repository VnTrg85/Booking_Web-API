import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import hotelsRouter from "./routes/hotels.js";
import roomsRouter from "./routes/rooms.js";
import usersRouter from "./routes/users.js";
import cookieParser from "cookie-parser";
import { createError } from "./utils/error.js";
const app = express();

dotenv.config();

//Connect to mongo db
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log("Connected to mongodb!");
	} catch (error) {
		throw error;
	}
};

mongoose.connection.on("disconnected", () => {
	console.log("Mongodb disconnected ");
});
mongoose.connection.on("connected", () => {
	console.log("Mongodb connected ");
});

//Middlewares

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Somthing went wrong!!!";
	res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

app.listen(8800, () => {
	connect();
	console.log("Connected to backend");
});
