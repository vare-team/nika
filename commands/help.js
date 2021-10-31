import { MessageEmbed } from 'discord.js';
import texts from '../models/texts';
import colors from '../models/colors';

export const commandObject = {
	name: 'help',
	description: 'Information about protect modes',
};

export function run(interaction) {
	const embed = new MessageEmbed()
		.setColor(colors.blue)
		.setTitle(texts[interaction.guildSettings.lang].deffMode)
		.setDescription(texts[interaction.guildSettings.lang].deffModeMore);

	interaction.reply({ embeds: [embed], ephemeral: true });
}

export default {
	commandObject,
	run,
};
