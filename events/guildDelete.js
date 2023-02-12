import Guild from '../models/guild.js';

export default async function (guild) {
	await Guild.destroy({ where: { id: guild.id } });
}
