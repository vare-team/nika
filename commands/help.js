import { MessageEmbed } from 'discord.js';
import texts from '../models/texts';
import colors from '../models/colors';

export const commandObject = {
	name: 'help',
	description: 'Information about bot',
};

export function run(interaction) {
	let newsEmbed = new MessageEmbed()
		.setAuthor(
			texts[interaction.guildSettings.lang].cmdList.replace('%author', discordClient.user.tag),
			discordClient.user.displayAvatarURL()
		)
		.setColor(colors.blue)
		.addField(
			texts[interaction.guildSettings.lang].cmd,
			texts[interaction.guildSettings.lang].cmdMore.replace(/%prefix/g, '/'),
			true
		)
		.addField(texts[interaction.guildSettings.lang].cmdAbout, texts[interaction.guildSettings.lang].cmdAboutMore, true)
		.addField(texts[interaction.guildSettings.lang].deffMode, texts[interaction.guildSettings.lang].deffModeMore);

	interaction.reply(newsEmbed);
}

export default {
	commandObject,
	run,
};
