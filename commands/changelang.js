module.exports.run = async(client, msg, args) => {
	args[0] = args[0].toLowerCase();
	if(['ru', 'en'].indexOf(args[0]) == -1) {
		msg.reply(client.userLib.langf[msg.flag].errLang1 + `**en**, **ru**`);
		return;
	}

	client.userLib.db.update('nika_server', {id: msg.guild.id, lang: args[0]}, () => {});

	let embed = new client.userLib.discord.RichEmbed()
		.setAuthor(msg.guild.name, msg.guild.iconURL)
		.setTitle(client.userLib.langf[msg.flag].langChanged)
		.addField(client.userLib.langf[msg.flag].lang, args[0], true)
		.setColor('#7289DA');
	msg.channel.send(embed);
}

module.exports.help = {
	tier: -2,
	args: 1
}