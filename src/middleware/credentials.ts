import { Request, Response, NextFunction, RequestHandler } from "express";
import { allowedOrigins } from "../config/allowedOrigins";

export const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials: true');
    }
    next();
}