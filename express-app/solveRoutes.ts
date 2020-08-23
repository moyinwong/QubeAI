import express from "express";
import { solveController } from "./main";

export const solveRoutes = express.Router();

solveRoutes.post("/api/solveCube", solveController.post);
