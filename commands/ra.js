exports.help = {
	tier: 1,
	args: 0
}

exports.run = (client, msg) => {
	client.userLib.db.queryKeyValue('SELECT id, tier FROM admins WHERE 1', (err, result) => client.userLib.admins = result);
	msg.reply('обновляю админов!');
}