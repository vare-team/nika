import { MessageEmbed } from 'discord.js';
import colors from '../models/colors';
import texts from '../models/texts';
import db from '../services/db';

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
	const embed = new MessageEmbed().setAuthor(interaction.guild.name, interaction.guild.iconURL());

	if (setting === 'moderation') {
		const newMode = interaction.options.getString('mode');
		await db.query(`UPDATE nika_server SET level = ? WHERE id = ?`, [newMode, interaction.guildId]);

		embed
			.setTitle(texts[interaction.guildSettings.lang].modeChanged)
			.addField(
				texts[interaction.guildSettings.lang].mode,
				texts[interaction.guildSettings.lang].modeName[newMode],
				true
			)
			.addField(
				`${texts[interaction.guildSettings.lang].aMode} "${texts[interaction.guildSettings.lang].modeName[newMode]}":`,
				texts[interaction.guildSettings.lang].modeMore[newMode],
				true
			)
			.setColor(colors.blue);
	}

	if (setting === 'language') {
		const newLanguage = interaction.options.getString('language');
		await db.query(`UPDATE nika_server SET lang = ? WHERE id = ?`, [newLanguage, interaction.guildId]);

		embed
			.setTitle(texts[newLanguage].langChanged)
			.addField(texts[newLanguage].lang, newLanguage, true)
			.setColor(colors.blue);
	}

	interaction.reply({ embeds: [embed], ephemeral: true });
}

export default {
	commandObject,
	run,
};
