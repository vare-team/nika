import { EmbedBuilder } from 'discord.js';
import colors from '../config/colors.js';

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
	const embed = new EmbedBuilder()
		.setAuthor({ name: discordClient.user.username, iconURL: discordClient.user.avatarURL() })
		.setFooter({ name: `Шард сервера: ${discordClient.shard.ids[0]}` })
		.setColor(colors.blue);

	const [guilds, pings, memory] = await Promise.all([
		discordClient.shard.fetchClientValues('guilds.cache.size'),
		discordClient.shard.broadcastEval(c => c.ws.ping.toFixed(0)),
		discordClient.shard.broadcastEval(() => +(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)),
	]);

	for (let i = 0, length = discordClient.shard.count; i < length; i++) {
		embed.addFields([
			{
				name: `${i + 1}. ${i} ${i === discordClient.shard.ids[0] ? '←' : ''}`,
				value: `Серверов: \`${guilds[i]}\`, Пинг: \`${pings[i]} мс\`, ОЗУ: \`${memory[i]} МБ\``,
			},
		]);
	}

	embed.addFields([
		{ name: '​', value: '​' },
		{
			name: `Всего: ${discordClient.shard.count}`,
			value: `Серверов: \`${sum(guilds)}\`, ОЗУ: \`${sum(memory).toFixed(2)} МБ\``,
		},
	]);

	await interaction.reply({ embeds: [embed], ephemeral: interaction.options.getBoolean('ephemeral') ?? true });
}

export default {
	commandObject,
	run,
};
