module.exports = async (client) => {
	setInterval(client.userLib.presenseFunc, 30000);
	client.userLib.sendlog(`{READY}`);
	if (client.shard.id == 0) {
		client.userLib.sendSDC((await client.shard.fetchClientValues('guilds.cache.size')).reduce((prev, val) => prev + val, 0), client.shard.count);
		setInterval(async () => client.userLib.sendSDC((await client.shard.fetchClientValues('guilds.cache.size')).reduce((prev, val) => prev + val, 0), client.shard.count), 30 * 60 * 1e3);
	}
};