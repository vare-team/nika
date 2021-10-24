import dataBase from '../services/dataBase';
import { MessageEmbed } from 'discord.js';
import texts from '../models/texts';
import colors from '../models/colors';

export const commandObject = {
	name: 'warns',
	description: 'The count of warnings',
	options: [
		{
			name: 'user',
			description: 'The count of user warnings',
			type: 6,
			required: false,
		},
	],
};

export async function run(interaction) {
	const member = interaction.options.getMember('user') ?? interaction.member;
	const warns = await dataBase.one('SELECT warns FROM blacklist WHERE id = ?', [member.id]);

	const embed = new MessageEmbed()
		.setColor(colors.green)
		.setTitle(texts[interaction.guildSettings.lang].warns)
		.setDescription(texts[interaction.guildSettings.lang].warnsNo.replace('{member}', member.user.tag));

	if (!warns) return interaction.reply(embed);

	embed
		.setColor(colors.red)
		.setTitle(texts[interaction.guildSettings.lang].warns)
		.setDescription(`${texts[interaction.guildSettings.lang].warnsCount} **${warns.warns}**`);

	interaction.reply(embed);
}

export default {
	commandObject,
	run,
};
