import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes/";
import { PORT, DATABASE_URI } from "./config/config";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
var allowCrossDomain = function (req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

mongoose
    .connect(DATABASE_URI)
    .then(async () => {
        console.log("Conneting to database");
    })
    .catch(() => {
        console.log("Could not connect to dabase");
    });
app.use(route);

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});