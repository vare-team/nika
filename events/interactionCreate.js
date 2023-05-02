import commands from '../commands';
import log from '../utils/log';
import Guild from '../models/guild';

export default async function (interaction) {
	if (!interaction.inGuild() || !interaction.isCommand()) return;

	const command = commands[interaction.commandName];
	interaction.guildSettings = await Guild.findByPk(interaction.guildId);
	interaction.guildSettings ??= Guild.getDefault(Guild.getLocale(interaction.guild?.preferredLocale));

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
