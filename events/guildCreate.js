import db from '../services/db';

export default async function (guild) {
	await db.query('INSERT INTO nika_server(id, lang) VALUE (?, ?)', [
		guild.id,
		guild.preferredLocale === 'ru' ? 'ru' : 'en',
	]);
}
