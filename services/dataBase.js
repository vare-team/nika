import mysql2 from 'mysql2';
import log from '../utils/log';

const dataBase = mysql2.createConnection({
	user: process.env.DBLOGIN,
	password: process.env.DBPASS,
	host: process.env.DBHOST,
	database: process.env.DBNAME,
	charset: 'utf8mb4',
	keepAliveInitialDelay: 7 * 60 * 1000,
	enableKeepAlive: true,
});

dataBase.on('error', err => {
	if (err.code === 'ECONNRESET' || err.code === 'PROTOCOL_CONNECTION_LOST') dataBase.connect();
	console.warn(err);
});

dataBase.connect(err => {
	if (err) return console.error('error connecting: ' + err.stack);
	dataBase.query('SET SESSION wait_timeout = 604800');
	log(`{DB Connected} (ID:${dataBase.threadId})`);
});

export default {
	query: dataBase.promise().query.bind(dataBase.promise()),

	async many(...args) {
		const query = await dataBase.promise().query(...args);
		return query[0];
	},

	async one(...args) {
		const query = await dataBase.promise().query(...args);
		return query[0][0];
	},
};