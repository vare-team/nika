import colors from '../config/colors.js';
import { EmbedBuilder } from 'discord.js';
import texts from '../config/texts.js';

export const commandObject = {
	name: 'invite',
	description: 'Bot invite link',
};

export function run(interaction) {
	const embed = new EmbedBuilder()
		.setAuthor({ name: discordClient.user.tag, iconURL: discordClient.user.displayAvatarURL() })
		.setTitle(texts[interaction.guildSettings.language].botInvite)
		.setURL(
			'https://discord.com/oauth2/authorize?client_id=543858333585506315&scope=bot+applications.commands&permissions=8'
		)
		.setColor(colors.blue);

	interaction.reply({ embeds: [embed], ephemeral: true });
}

export default {
	commandObject,
	run,
};
