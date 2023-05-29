import Guild from '../models/guild.js';

export default async function ({ params: { guildId } }, res) {
	await Guild.destroy({ where: { id: guildId } });
	res.end();
}
