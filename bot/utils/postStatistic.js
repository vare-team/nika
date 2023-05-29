import log from './log.js';
import { request } from 'undici';

const sdcInstance = async (userId, servers, shards) => {
	await request(`https://api.server-discord.com/v2/bots/${userId}/stats`, {
		method: 'POST',
		headers: { authorization: `SDC ${process.env.SDC}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({ servers, shards }),
	});
};

const topInstance = async (userId, shards) => {
	await request(`https://top.gg/api/bots/${userId}/stats`, {
		method: 'POST',
		headers: { authorization: process.env.DBL, 'Content-Type': 'application/json' },
		body: JSON.stringify({ shards }),
	});
};

export default async function () {
	if (!process.env.SDC && !process.env.DBL) return;
	const servers = await discordClient.shard.fetchClientValues('guilds.cache.size');
	if (process.env.SDC)
		await sdcInstance(
			discordClient.user.id,
			servers.reduce((p, v) => p + v),
			discordClient.shard.count
		);

	if (process.env.DBL) await topInstance(discordClient.user.id, servers);
	log('{SDC} Send stats data.');
}
