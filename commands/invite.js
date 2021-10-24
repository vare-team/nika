import colors from '../models/colors';
import { MessageEmbed } from 'discord.js';
import texts from '../models/texts';

export const commandObject = {
	name: 'invite',
	description: 'Bot invite link',
};

export function run(interaction) {
	const embed = new MessageEmbed()
		.setAuthor(discordClient.user.tag, discordClient.user.displayAvatarURL())
		.setTitle(texts[interaction.guildSettings.lang].botInvite)
		.setURL(
			'https://discord.com/oauth2/authorize?client_id=543858333585506315&scope=bot+applications.commands&permissions=8'
		)
		.setColor(colors.blue);

	interaction.reply(embed);
}

export default {
	commandObject,
	run,
};
