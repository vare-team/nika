import commands from '../commands/index.js';
import log from '../utils/log.js';
import getGuildConfig from '../services/get-guild-config.js';
import Guild from '../models/Guild.js';

export default async function (interaction) {
	if (!interaction.inGuild() || !interaction.isCommand()) return;

	const command = commands[interaction.commandName];
	interaction.guildSettings = await getGuildConfig(
		interaction.guildId,
		Guild.getLocale(interaction.guild?.preferredLocale)
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
