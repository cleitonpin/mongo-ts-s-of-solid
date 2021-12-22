import 'express-async-errors';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';

import { connect } from './config/database';
import { routes } from './routes';

dotenv.config();
const app = express();
const PORT = 3333 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err) {
		res.status(403).json({ error: err.message });
	}

	next(err);
});

connect();

app.listen(PORT, () =>
	console.log(chalk.bgRed(`[~] Listening in http://localhost:${PORT}`))
);
