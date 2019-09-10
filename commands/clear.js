module.exports.run = (client, msg, args) => {
	args[0] = +args[0];
	if(isNaN(args[0])) {
		msg.channel.send(client.userLib.langf[msg.flag].errMsg);
		return;
	}
	args[0] = args[0] > 100 ? 100 : args[0];

	msg.channel.bulkDelete(args[0], true).then(dmsg => 
		msg.channel.send(client.userLib.langf[msg.flag].msgDeleted.replace('%msg', dmsg.size)).then(msg => msg.delete(3000).catch(() => {}))
	);
}

module.exports.help = {
  tier: -1,
  args: 1
}