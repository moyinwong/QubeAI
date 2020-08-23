import { SolveController } from "./SolveController";
import { SolveService } from "./SolveService";
import { Request, Response } from "express";

//mock the whole express module
jest.mock("express");

//mock the whole fs module
jest.mock("fs");

describe("solveController", () => {
  let controller: SolveController;
  let service: SolveService;
  let resJson: jest.SpyInstance;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    //declare variables before each test
    service = new SolveService();

    //need body, params, session for the method
    req = ({ body: {} } as any) as Request;

    res = ({
      json: jest.fn(() => {}),
    } as any) as Response;

    //get original method "json" from res
    resJson = jest.spyOn(res, "json");

    controller = new SolveController(service);

    //mock the method from solveServices
    jest
      .spyOn(service, "solveCube")
      .mockImplementation(
        (): Promise<any> => Promise.resolve([true, ["R", "L"]])
      );
  });

  it("should get if success and step", async () => {
    console.log(controller);
    await controller.post(req, res);
    expect(service.solveCube).toBeCalledTimes(1);
    expect(service.solveCube).toBeCalledWith(req.body);
    expect(resJson).toBeCalledWith([true, ["R", "L"]]);
  });
});
