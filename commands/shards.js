import { MessageEmbed } from 'discord.js';
import colors from '../models/colors';

const sum = values => values.reduce((p, v) => p + v, 0);

export const commandObject = {
	name: 'shards',
	description: 'All bot shards',
	options: [
		{
			type: 5,
			name: 'ephemeral',
			description: 'Отправить эфемерно',
		},
	],
};

export async function run(interaction) {
	const embed = new MessageEmbed()
		.setAuthor(discordClient.user.username, discordClient.user.avatarURL())
		.setFooter(`Шард сервера: ${discordClient.shard.ids[0]}`)
		.setColor(colors.blue);

	const [guilds, pings, memory] = await Promise.all([
		discordClient.shard.fetchClientValues('guilds.cache.size'),
		discordClient.shard.broadcastEval(c => c.ws.ping.toFixed(0)),
		discordClient.shard.broadcastEval(() => +(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)),
	]);

	for (let i = 0, length = discordClient.shard.count; i < length; i++) {
		embed.addField(
			`${i + 1}. ${i} ${i === discordClient.shard.ids[0] ? '←' : ''}`,
			`Серверов: \`${guilds[i]}\`, Пинг: \`${pings[i]} мс\`, ОЗУ: \`${memory[i]} МБ\``
		);
	}

	embed.addField('​', '​');
	embed.addField(
		`Всего: ${discordClient.shard.count}`,
		`Серверов: \`${sum(guilds)}\`, ОЗУ: \`${sum(memory).toFixed(2)} МБ\``
	);

	await interaction.editReply({ embeds: [embed], ephemeral: interaction.options.getBoolean('ephemeral') ?? true });
}

export default {
	commandObject,
	run,
};
