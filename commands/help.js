import { MessageEmbed } from 'discord.js';
import texts from '../models/texts';
import colors from '../models/colors';

export const commandObject = {
	name: 'help',
	description: 'Information about protect modes',
};

export function run(interaction) {
	let embed = new MessageEmbed()
		.setColor(colors.blue)
		.addField(texts[interaction.guildSettings.lang].cmdAbout, texts[interaction.guildSettings.lang].cmdAboutMore, true)
		.addField(texts[interaction.guildSettings.lang].deffMode, texts[interaction.guildSettings.lang].deffModeMore);

	interaction.reply({ embeds: [embed], ephemeral: true });
}

export default {
	commandObject,
	run,
};
