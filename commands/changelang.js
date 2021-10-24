import { MessageEmbed } from 'discord.js';
import colors from '../models/colors';
import texts from '../models/texts';
import dataBase from '../services/dataBase';

export const commandObject = {
	name: 'changelang',
	description: 'Change bot language',
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
};

export async function run(interaction) {
	const newLanguage = interaction.options.getString('language');

	await dataBase.query(`UPDATE nika_server SET lang = ? WHERE id = ?`, [newLanguage, interaction.guildId]); //TODO: Перепроверить это

	let embed = new MessageEmbed()
		.setAuthor(interaction.guild.name, interaction.guild.iconURL())
		.setTitle(texts[newLanguage].langChanged)
		.addField(texts[newLanguage].lang, newLanguage, true)
		.setColor(colors.blue);
	interaction.reply(embed);
}

export default {
	commandObject,
	run,
};
