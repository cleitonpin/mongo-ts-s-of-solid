import { greenBright, redBright } from 'chalk';
import {
	connect as conn,
	Connection,
	connection,
	disconnect as disc,
} from 'mongoose';

let database: Connection;

export const connect = () => {
	const { URL } = process.env;
	if (database) return;

	conn(URL, {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
		// useFindAndModify: true,
		// useCreateIndex: true
	});

	database = connection;

	database.once('open', () => {
		console.log(greenBright('Connected to database'));
	});

	database.once('error', () => {
		console.log(redBright('Error connecting to database'));
	});
};

export const disconnect = () => {
	if (!database) return;

	disc();
};
