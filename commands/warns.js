import { EmbedBuilder } from 'discord.js';
import texts from '../config/texts.js';
import colors from '../config/colors.js';
import Blacklist from '../models/blacklist.js';

export const commandObject = {
	name: 'warns',
	description: 'The count of warnings',
	options: [
		{
			name: 'user',
			description: 'The count of user warnings',
			type: 6,
		},
	],
};

export async function run(interaction) {
	const user = interaction.options.getUser('user') ?? interaction.user;
	const warns = await Blacklist.findByPk(user.id);

	const embed = new EmbedBuilder()
		.setColor(colors.green)
		.setTitle(texts[interaction.guildSettings.language].warns)
		.setDescription(texts[interaction.guildSettings.language].warnsNo.replace('{member}', user));

	if (!warns) return interaction.reply({ embeds: [embed] });
	embed
		.setColor(colors.red)
		.setDescription(`${texts[interaction.guildSettings.language].warnsCount} **${warns.warns}**`);
	interaction.reply({ embeds: [embed] });
}

export default {
	commandObject,
	run,
};
