module.exports = (client) => {
	setInterval(client.userLib.presenseFunc, 30000);
	client.userLib.sendlog(`{READY}`);
	if (client.shard.id == 0) {
		setInterval(async () => client.userLib.sendSDC((await client.shard.fetchClientValues('guilds.size')).reduce((prev, val) => prev + val, 0), client.shard.count), 30 * 60 * 1e3);
	}
};