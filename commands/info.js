import colors from '../config/colors.js';
import { EmbedBuilder } from 'discord.js';
import texts from '../config/texts.js';

export const commandObject = {
	name: 'info',
	description: 'Information about bot settings',
};

export function run(interaction) {
	const embed = new EmbedBuilder()
		.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
		.setDescription(texts[interaction.guildSettings.language].botInfo)
		.addFields([
			{
				name: texts[interaction.guildSettings.language].modeInfo,
				value: texts[interaction.guildSettings.language].modeName[interaction.guildSettings.level],
				inline: true,
			},
			{
				name: `${texts[interaction.guildSettings.language].aMode} "${
					texts[interaction.guildSettings.language].modeName[interaction.guildSettings.level]
				}"`,
				value: texts[interaction.guildSettings.language].modeMore[interaction.guildSettings.level],
				inline: true,
			},
		])
		.setFooter(texts[interaction.guildSettings.language].guildCreated)
		.setTimestamp(interaction.guild.createdAt)
		.setColor(colors.blue);

	interaction.reply({ embeds: [embed], ephemeral: true });
}

export default {
	commandObject,
	run,
};
