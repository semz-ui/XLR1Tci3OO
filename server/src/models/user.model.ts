import { Document, model, Schema } from "mongoose";
export interface Euser {
    email: string;
    password: string;
}

export default interface UserModel extends Document, Euser { }

const schema = new Schema({
    email: { type: String },
    password: { type: String },
});

export const User = model<UserModel>("user", schema);