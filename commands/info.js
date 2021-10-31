import colors from '../models/colors';
import { MessageEmbed } from 'discord.js';
import texts from '../models/texts';

export const commandObject = {
	name: 'help',
	description: 'Information about bot settings',
};

export function run(interaction) {
	const embed = new MessageEmbed()
		.setAuthor(interaction.guild.name, interaction.guild.iconURL())
		.setDescription(texts[interaction.guildSettings.lang].botInfo)
		.addField(
			texts[interaction.guildSettings.lang].modeInfo,
			texts[interaction.guildSettings.lang].modeName[interaction.guildSettings.level],
			true
		)
		.addField(
			`${texts[interaction.guildSettings.lang].aMode} "${
				texts[interaction.guildSettings.lang].modeName[interaction.guildSettings.level]
			}"`,
			texts[interaction.guildSettings.lang].modeMore[interaction.guildSettings.level],
			true
		)
		.setFooter(texts[interaction.guildSettings.lang].guildCreated)
		.setTimestamp(interaction.guild.createdAt)
		.setColor(colors.blue);

	interaction.reply({ embeds: [embed], ephemeral: true });
}

export default {
	commandObject,
	run,
};
