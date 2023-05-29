import { ShardingManager, fetchRecommendedShardCount } from 'discord.js';
import log from './utils/log.js';

const shardManager = new ShardingManager('./nika.js', {
	mode: 'worker',
	token: process.env.TOKEN,
});

shardManager.on('shardCreate', shard => log(`Shard spawned!`, shard.id));

(async () => {
	const amount = await fetchRecommendedShardCount(process.env.TOKEN, { guildsPerShard: 2000 });
	log(`Shards count: ${amount}`, 'null');

	shardManager.shardList = [...Array(amount).keys()];
	shardManager.totalShards = amount;

	// Spawn the shards
	const promises = [];
	for (let i = 0; i < amount; i++) promises.push(shardManager.createShard(i).spawn(5 * 60e3));
	const shards = await Promise.all(promises);

	for (const shard of shards) shard.postMessage('startPresence');
})();
