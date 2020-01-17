module.exports.run = async (client, msg, args) => {
	let on = msg.guild.members.filter(m => m.presence.status != 'offline' && !m.user.bot).size,
		off = msg.guild.members.filter(m => !m.user.bot).size;
	let result = await client.userLib.promise(client.userLib.db, client.userLib.db.queryValue, 'SELECT level FROM nika_server WHERE id = ?', [msg.guild.id]);
	let embed = new client.userLib.discord.RichEmbed()
		.setAuthor(msg.guild.name, msg.guild.iconURL)
		.setDescription(client.userLib.langf[msg.flag].botInfo)
		.addField(client.userLib.langf[msg.flag].modeInfo, client.userLib.langf[msg.flag].modeName[result.res], true)
		.addField(`${client.userLib.langf[msg.flag].aMode} "${client.userLib.langf[msg.flag].modeName[result.res]}"`, client.userLib.langf[msg.flag].modeMore[result.res], true)
		.addField(client.userLib.langf[msg.flag].online, Math.round(on / off * 100) + "%")
		.setFooter(client.userLib.langf[msg.flag].guildCreated)
		.setTimestamp(new Date(msg.guild.createdTimestamp))
		.setColor('#7289DA');
	msg.channel.send(embed);
};

module.exports.help = {
	tier: 0,
	args: 0
};