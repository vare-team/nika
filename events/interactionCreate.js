import commands from '../commands';
import log from '../utils/log';
import db from '../services/db';

export default async function (interaction) {
	if (!interaction.inGuild() || !interaction.isCommand()) return;

	const command = commands[interaction.commandName];
	interaction.guildSettings = await db.one('SELECT * FROM nika_server WHERE id = ?', [interaction.guildId]);

	try {
		await command.run(interaction);
	} catch (e) {
		if (e.code === 10062) {
			log(interaction.commandName + ' | ' + e.message);
		} else {
			console.warn(e);
		}
	}
}