import commands from '../commands';
import log from '../utils/log';
import Guild from '../models/guild';

export default async function (interaction) {
	if (!interaction.inGuild() || !interaction.isCommand()) return;

	const command = commands[interaction.commandName];
	interaction.guildSettings = await Guild.findByPk(interaction.guildId);

	if (!interaction.guildSettings) {
		const language = interaction.guild?.preferredLocale === 'ru' ? 'ru' : 'en';
		interaction.guildSettings = { language, level: 'medium' };
	}

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
