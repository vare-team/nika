require('http').createServer().listen(1600);

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./nika.js', { token: process.env.token });

manager.spawn();

manager.on('shardCreate', (shard) => {
	let launchNow = new Date();
	console.log(`${('00' + launchNow.getHours()).slice(-2) + ':' + ('00' + launchNow.getMinutes()).slice(-2) + ':' + ('00' + launchNow.getSeconds()).slice(-2)} | Launched shard ${shard.id}`)
});

// manager.on('message', (shard, message) => {
// 	let messageNow = new Date();
// 	console.log(`${('00' + messageNow.getHours()).slice(-2) + ':' + ('00' + messageNow.getMinutes()).slice(-2) + ':' + ('00' + messageNow.getSeconds()).slice(-2)} | Shard[${shard.id}] : {Info} ${message._result}`);
// });