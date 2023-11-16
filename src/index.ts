import { corsOptions } from "./config/corsOptions";
import { credentials } from "./middleware/credentials";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logEvents";
import rootRoute from "./routes/root";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(credentials);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/', rootRoute);

app.all('*', (req: Request, res: Response) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '../src', 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
})