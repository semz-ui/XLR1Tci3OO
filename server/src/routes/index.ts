import express from "express";
import Auth from "./auth.route";

const route = express.Router();

route.use("/api/v1/auth", Auth);

export default route;