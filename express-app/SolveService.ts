import fetch from "node-fetch";

export class SolveService {
  constructor() {}

  //solve
  async solveCube(cubeStatus: Object) {
    const fetchRes = await fetch("http://localhost:4000/solve", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cubeStatus),
    });

    const result = await fetchRes.json();

    return result;
  }
}
