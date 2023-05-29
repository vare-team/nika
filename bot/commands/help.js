import { EmbedBuilder } from 'discord.js';
import texts from '../config/texts.js';
import colors from '../config/colors.js';

export const commandObject = {
	name: 'help',
	description: 'Information about protect modes',
};

export function run(interaction) {
	const embed = new EmbedBuilder()
		.setColor(colors.blue)
		.setTitle(texts[interaction.guildSettings.language].deffMode)
		.setDescription(texts[interaction.guildSettings.language].deffModeMore);

	interaction.reply({ embeds: [embed], ephemeral: true });
}

export default {
	commandObject,
	run,
};
