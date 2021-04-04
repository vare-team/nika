module.exports.run = async (client, msg, args) => {
	let result = await client.userLib.promise(client.userLib.db, client.userLib.db.queryValue, 'SELECT level FROM nika_server WHERE id = ?', [msg.guild.id]);

	let embed = new client.userLib.discord.MessageEmbed()
		.setAuthor(msg.guild.name, msg.guild.iconURL())
		.setDescription(client.userLib.langf[msg.flag].botInfo)
		.addField(client.userLib.langf[msg.flag].modeInfo, client.userLib.langf[msg.flag].modeName[result.res], true)
		.addField(`${client.userLib.langf[msg.flag].aMode} "${client.userLib.langf[msg.flag].modeName[result.res]}"`, client.userLib.langf[msg.flag].modeMore[result.res], true)
		.setFooter(client.userLib.langf[msg.flag].guildCreated)
		.setTimestamp(new Date(msg.guild.createdTimestamp))
		.setColor('#7289DA');

	msg.channel.send(embed);
};

module.exports.help = {
	tier: 0,
	args: 0
};