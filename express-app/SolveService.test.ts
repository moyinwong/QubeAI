import { SolveService } from "./SolveService";

describe("MemoService test suit", () => {
  let solveService: SolveService;

  const testingObj: Object = {
    L: { L: "red" },
    R: { R: "orange" },
    U: { U: "yellow" },
    D: { D: "white" },
    F: { F: "green" },
    B: { B: "blue" },
    LB: { L: "red", B: "white" },
    LF: { L: "red", F: "yellow" },
    LU: { L: "red", U: "blue" },
    LD: { L: "red", D: "green" },
    DB: { D: "white", B: "blue" },
    DF: { D: "white", F: "green" },
    UB: { U: "yellow", B: "blue" },
    UF: { U: "yellow", F: "green" },
    RB: { R: "orange", B: "white" },
    RF: { R: "orange", F: "yellow" },
    RU: { R: "orange", U: "blue" },
    RD: { R: "orange", D: "green" },
    LDB: { L: "red", D: "green", B: "white" },
    LDF: { L: "red", D: "green", F: "yellow" },
    LUB: { L: "red", U: "blue", B: "white" },
    LUF: { L: "red", U: "blue", F: "yellow" },
    RDB: { R: "orange", D: "green", B: "white" },
    RDF: { R: "orange", D: "green", F: "yellow" },
    RUB: { R: "orange", U: "blue", B: "white" },
    RUF: { R: "orange", U: "blue", F: "yellow" },
  };

  beforeEach(async () => {
    solveService = new SolveService();
  });

  //with true and 2 steps
  it("should return Python json response", async () => {
    const result = await solveService.solveCube(testingObj);

    expect(result.length).toBe(2);
    expect(result[0]).toBe(true);
    expect(result[1].length).toBeGreaterThanOrEqual(1);
  });
});
