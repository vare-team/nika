import db from '../services/db';

export default async function (guild) {
	await db.query('DELETE FROM nika_server WHERE id = ?', [guild.id]);
}
