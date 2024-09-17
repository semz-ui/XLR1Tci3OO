import { Jwt } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const protectRoute = async (req: any, res: any, next: any) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header and remove Bearer from string
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, SECRET_KEY) as Jwt;
            // Get user from database
            req.user = await User.findById(decoded._id);
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized to access this route");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized no token");
    }
};