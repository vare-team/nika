let rusMode = {'низкий': 'low', 'средний': 'medium', 'берсеркер': 'berserker'};

module.exports.run = async(client, msg, args) => {
	args[0] = args[0].toLowerCase();
	if (['низкий', 'средний', 'берсеркер', 'low', 'medium', 'berserker'].indexOf(args[0]) == -1) {
		msg.reply(client.userLib.langf[msg.flag].errMode1 + `**${client.userLib.langf[msg.flag].modeName.low}**, **${client.userLib.langf[msg.flag].modeName.medium}**, **${client.userLib.langf[msg.flag].modeName.berserker}**`);
		return;
	}

	args[0] = rusMode.hasOwnProperty(args[0]) ? rusMode[args[0]] : args[0];

	client.userLib.db.update('nika_server', {id: msg.guild.id, level: args[0]}, () => {});

	let embed = new client.userLib.discord.RichEmbed()
		.setAuthor(msg.guild.name, msg.guild.iconURL)
		.setTitle(client.userLib.langf[msg.flag].modeChanged)
		.addField(client.userLib.langf[msg.flag].mode, client.userLib.langf[msg.flag].modeName[args[0]], true)
		.addField(`${client.userLib.langf[msg.flag].aMode} "${client.userLib.langf[msg.flag].modeName[args[0]]}":`, client.userLib.langf[msg.flag].modeMore[args[0]], true)
		.setColor('#7289DA');
	msg.channel.send(embed)
}

module.exports.help = {
	tier: -2,
	args: 1
}