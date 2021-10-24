import { MessageEmbed } from 'discord.js';
import colors from '../models/colors';
import texts from '../models/texts';
import dataBase from '../services/dataBase';

export const commandObject = {
	name: 'changemode',
	description: 'Change moderation mode',
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
};

export async function run(interaction) {
	const newMode = interaction.options.getString('mode');

	await dataBase.query(`UPDATE nika_server SET level = ? WHERE id = ?`, [newMode, interaction.guildId]); //TODO: Перепроверить это

	const embed = new MessageEmbed()
		.setAuthor(interaction.guild.name, interaction.guild.iconURL())
		.setTitle(texts[interaction.guildSettings.lang].modeChanged)
		.addField(texts[interaction.guildSettings.lang].mode, texts[interaction.guildSettings.lang].modeName[newMode], true)
		.addField(
			`${texts[interaction.guildSettings.lang].aMode} "${texts[interaction.guildSettings.lang].modeName[newMode]}":`,
			texts[interaction.guildSettings.lang].modeMore[newMode],
			true
		)
		.setColor(colors.blue);
	interaction.reply(embed);
}

export default {
	commandObject,
	run,
};
