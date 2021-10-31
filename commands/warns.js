import db from '../services/db';
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
		},
	],
};

export async function run(interaction) {
	const user = interaction.options.getUser('user') ?? interaction.user;
	const warns = await db.one('SELECT warns FROM blacklist WHERE id = ?', [user.id]);

	const embed = new MessageEmbed()
		.setColor(colors.green)
		.setTitle(texts[interaction.guildSettings.lang].warns)
		.setDescription(texts[interaction.guildSettings.lang].warnsNo.replace('{member}', user));

	if (!warns) return interaction.reply({ embeds: [embed] });
	embed.setColor(colors.red).setDescription(`${texts[interaction.guildSettings.lang].warnsCount} **${warns.warns}**`);
	interaction.reply({ embeds: [embed] });
}

export default {
	commandObject,
	run,
};
