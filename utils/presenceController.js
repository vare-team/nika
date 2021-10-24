import dataBase from '../services/dataBase';

let presence = 0;

export default async function () {
	if (presence === 1) {
		discordClient.user.setActivity('/info | /invite', { type: 'WATCHING' });
	} else if (presence === 2) {
		const guilds = await discordClient.shard.fetchClientValues('guilds.cache.size');
		discordClient.user.setActivity(`серверов: ${guilds.reduce((p, v) => p + v, 0)} | /help`, { type: 'WATCHING' });
	} else if (presence === 3) {
		const blacklist = await dataBase.one('SELECT COUNT(*) as count FROM blacklist WHERE warns > 2');
		await discordClient.user.setActivity(`в ЧС: ${blacklist.count} | /help`, { type: 'WATCHING' });
		presence = 0;
	}
	presence++;
}
