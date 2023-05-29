import commands from '../commands/index.js';
import log from '../utils/log.js';
import getGuildConfig from '../services/get-guild-config.js';
import Guilds from '../models/Guilds.js';

export default async function (interaction) {
	if (!interaction.inGuild() || !interaction.isCommand()) return;

	const command = commands[interaction.commandName];
	interaction.guildSettings = await getGuildConfig(
		interaction.guildId,
		Guilds.getLocale(interaction.guild?.preferredLocale)
	);

	try {
		await command.run(interaction);
	} catch (e) {
		if (e.code === 10062) {
			log(`${interaction.commandName} | ${e.message}`);
		} else {
			console.warn(e);
		}
	}
}
