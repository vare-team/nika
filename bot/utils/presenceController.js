import { ActivityType } from 'discord.js';
import getBlacklistedCount from '../services/get-blacklisted-count.js';

let presence = 1;

export default async function () {
	if (presence === 1) {
		discordClient.user.setActivity('/info | /invite', { type: ActivityType.Watching });
	} else if (presence === 2) {
		const guilds = await discordClient.shard.fetchClientValues('guilds.cache.size');
		discordClient.user.setActivity(`серверов: ${guilds.reduce((p, v) => p + v, 0)} | /help`, {
			type: ActivityType.Watching,
		});
	} else if (presence === 3) {
		const blacklist = await getBlacklistedCount();
		await discordClient.user.setActivity(`в ЧС: ${blacklist} | /help`, { type: ActivityType.Watching });
		presence = 0;
	}
	presence++;
}
