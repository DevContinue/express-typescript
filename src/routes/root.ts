import express, { Request, Response } from "express";
import path from "path";

const router = express.Router();

export default router.get("^/$|/index(.html)?", (req: Request, res: Response) => {
  
  res.sendFile(path.join(__dirname, "../../src", "views", "index.html"));
});
