exports.help = {
	flag: 1,
	args: 0
}

exports.run = async (client, msg) => {
	msg.channel.startTyping();

	let res = await client.shard.broadcastEval(`[ ...this.guilds.keys() ]`);
	let temp = [];
	for (var i = 0, length = client.shard.count; i < length; i++) temp.push(...res[i]);
	res = temp;

	client.userLib.db.queryCol(`SELECT id FROM nika_server WHERE id IN (?)`, [res], async (err, result) => {
		result = res.filter(item => result.indexOf(item) == -1);
		let temp = '';
		console.log(result);
		for (var i in result) {
			temp += 'no in db: ' + result[i] + ' ' + (await client.shard.broadcastEval(`this.guilds.get('${result[i]}') ? this.guilds.get('${result[i]}').name : 0`)).find(i => i) + '\n';
		}
		msg.channel.send(temp).catch(() => msg.channel.send('Серверов нет'));
	});

	msg.channel.stopTyping();
}