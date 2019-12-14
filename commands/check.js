exports.run = async (client, msg, args) => {
	args[0] = args[0].toLowerCase();
	if (['warn', 'ban'].indexOf(args[0]) == -1) {
		msg.reply(client.userLib.langf[msg.flag].errCheck1 + `**warn**, **ban**`);
		return;
	}

	let data = await client.userLib.promise(client.userLib.db, client.userLib.db.query, `SELECT id, warns FROM blacklist WHERE id IN (?) AND warns ${args[0] == 'warn' ? '<=' : '>'} 2`, [msg.guild.members.filter(m => !m.bot).map(val => val.id)]);
	data = data.res;

	let temp = '```\n';
	for (var i of data) {
		if ((temp+msg.guild.members.get(i.id).user.tag+' (ID: '+i.id+') warns: '+i.warns+'\n```').length >= 2000) {
			msg.channel.send(temp+'```');
			temp = '```\n';
		}
		temp += msg.guild.members.get(i.id).user.tag+' (ID: '+i.id+') warns: '+i.warns+'\n';
	}
	if (temp.length) msg.channel.send(temp+'```');
};

exports.help = {
	tier: -2,
	args: 1
};