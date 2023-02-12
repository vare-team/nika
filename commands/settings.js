import { EmbedBuilder } from 'discord.js';
import colors from '../config/colors.js';
import texts from '../config/texts.js';

export const commandObject = {
	name: 'settings',
	description: 'Bot`s settings',
	options: [
		{
			name: 'language',
			description: 'Change bot language',
			type: 1,
			options: [
				{
					name: 'language',
					description: 'bot language',
					type: 3,
					required: true,
					choices: [
						{
							name: 'English',
							value: 'en',
						},
						{
							name: 'Russian',
							value: 'ru',
						},
					],
				},
			],
		},
		{
			name: 'moderation',
			description: 'Change moderation mode',
			type: 1,
			options: [
				{
					name: 'mode',
					description: 'moderation mode',
					type: 3,
					required: true,
					choices: [
						{
							name: 'Low',
							value: 'low',
						},
						{
							name: 'Medium',
							value: 'medium',
						},
						{
							name: 'Berserker',
							value: 'berserker',
						},
					],
				},
			],
		},
	],
};

export async function run(interaction) {
	if (!interaction.member.permissions.has('ADMINISTRATOR')) {
		return;
	}

	const setting = interaction.options.getSubcommand();
	const embed = new EmbedBuilder().setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() });

	if (setting === 'moderation') {
		const newMode = interaction.options.getString('mode');
		await interaction.guildSettings.update({ level: newMode });

		embed
			.setTitle(texts[interaction.guildSettings.language].modeChanged)
			.addFields([
				{
					name: texts[interaction.guildSettings.language].mode,
					value: texts[interaction.guildSettings.language].modeName[newMode],
					inline: true,
				},
				{
					name: `${texts[interaction.guildSettings.language].aMode} "${
						texts[interaction.guildSettings.language].modeName[newMode]
					}":`,
					value: texts[interaction.guildSettings.language].modeMore[newMode],
					inline: true,
				},
			])
			.setColor(colors.blue);
	}

	if (setting === 'language') {
		const newLanguage = interaction.options.getString('language');
		await interaction.guildSettings.update({ language: newLanguage });

		embed
			.setTitle(texts[newLanguage].langChanged)
			.addFields([{ name: texts[newLanguage].lang, value: newLanguage, inline: true }])
			.setColor(colors.blue);
	}

	interaction.reply({ embeds: [embed], ephemeral: true });
}

export default {
	commandObject,
	run,
};
