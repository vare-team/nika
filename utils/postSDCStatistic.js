import { default as axios } from 'axios';
import log from '../utils/log';

const axiosInstance = axios.create({
	method: 'POST',
	baseURL: 'https://api.server-discord.com/v2/bots',
	headers: { authorization: 'SDC ' + process.env.sdc },
});

export default async function () {
	const servers = (await discordClient.shard.fetchClientValues('guilds.cache.size')).reduce((p, v) => p + v, 0);
	axiosInstance({ url: discordClient.user.id + '/stats', data: { servers, shards: discordClient.shard.count } });
	log('{SDC} Send stats data.');
}
