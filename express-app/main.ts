import express, { NextFunction } from 'express';
import expressSession from 'express-session';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';

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
app.use(expressSession({
    secret: 'Qube is released',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

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
})

// ---------------------------------------------------------------------------------------------------------------
// Funtional Middlewares
// ---------------------------------------------------------------------------------------------------------------

// Submit Cube Data
app.use('/solveCube', async (req: Request, res: Response) => {

    console.log(req.body);
    const result = `Connected to Express suscessfully.  Received: ${req.body[0]}, ${req.body[1]}, ${req.body[2]}...`;

    if (req.session) {
        res.json(result);
    }
})

// ---------------------------------------------------------------------------------------------------------------
// PORT
// ---------------------------------------------------------------------------------------------------------------

// Listen to PORT
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})