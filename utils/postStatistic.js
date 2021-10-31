import { default as axios } from 'axios';
import log from '../utils/log';

const sdcInstance = axios.create({
	method: 'POST',
	baseURL: 'https://api.server-discord.com/v2/bots',
	headers: { authorization: 'SDC ' + process.env.SDC },
});

const topInstance = axios.create({
	method: 'POST',
	baseURL: 'https://top.gg/api/bots',
	headers: { authorization: process.env.DBL },
});

export default async function () {
	if (!process.env.SDC && !process.env.DBL) return;
	const servers = await discordClient.shard.fetchClientValues('guilds.cache.size');
	if (process.env.SDC)
		sdcInstance({
			url: discordClient.user.id + '/stats',
			data: { servers: servers.reduce((p, v) => p + v, 0), shards: discordClient.shard.count },
		});
	if (process.env.DBL) topInstance({ url: discordClient.user.id + '/stats', data: { shards: servers } });
	log('{SDC} Send stats data.');
}
