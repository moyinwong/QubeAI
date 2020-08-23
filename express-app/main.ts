import express, { NextFunction } from "express";
import expressSession from "express-session";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

// ---------------------------------------------------------------------------------------------------------------
// Set-up
// ---------------------------------------------------------------------------------------------------------------

const app = express();

// Body Parser (cannot read "multipart/form-data")
// Handle normal form submits
app.use(bodyParser.urlencoded({ extended: true }));
// Handle JSON submits
app.use(bodyParser.json());

// Create Session
app.use(
  expressSession({
    secret: "Qube is released",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Count requests
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    if (!req.session.counter) {
      req.session.counter = 1;
    } else {
      req.session.counter++;
    }
    console.log(`\n Number of session requests: ${req.session.counter}`);
  }

  // Get Request Path
  const requestDate = new Date();
  const requestTime = `[${requestDate.getFullYear()}-${requestDate.getMonth()}-${requestDate.getDate()} ${requestDate.getHours()}:${requestDate.getMinutes()}:${requestDate.getSeconds()}]`;
  console.log(`${requestTime} Request: ${req.path}`);

  next();
});

// ---------------------------------------------------------------------------------------------------------------
// Funtional Middlewares
// ---------------------------------------------------------------------------------------------------------------
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

// Submit Cube Data
app.post("/api/solveCube", async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const fetchRes = await fetch("http://localhost:5000/solve", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    let result = await fetchRes.json();
    // if (result) {
    //   console.log(result);
    // } else {
    //   console.log("no result");
    // }

    // To python
    // const result = `Connected to Express suscessfully.`;

    // Res to React
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ---------------------------------------------------------------------------------------------------------------
// PORT
// ---------------------------------------------------------------------------------------------------------------

// Listen to PORT
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
