import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";

export const register = async (req: any, res: any, next: any) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id }, SECRET_KEY);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token: token
        });
    } catch (err: any) {
        next(err)
    }
};

export const login = async (req: any, res: any, next: any) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ _id: user._id }, SECRET_KEY);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token: token
        });
    }
    catch (err: any) {
        next(err)
    }
}

export const getUser = async (req: any, res: any, next: any) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({
            _id: user._id,
            email: user.email,
        });
    } catch (err: any) {
        next(err)
    }
}