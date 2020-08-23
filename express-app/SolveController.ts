import { SolveService } from "./SolveService";
import { Request, Response } from "express";

export class SolveController {
  constructor(private solveService: SolveService) {}

  post = async (req: Request, res: Response) => {
    try {
      const result = await this.solveService.solveCube(req.body);

      console.log(result);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
