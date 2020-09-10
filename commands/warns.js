module.exports.run = async (client, msg, args) => {
	let memberInfo = msg.mentions.users.first() || (args[0] ? args[0] : msg.author);

	let result = await client.userLib.promise(client.userLib.db, client.userLib.db.queryValue, 'SELECT warns FROM blacklist WHERE id = ?', [memberInfo.id]);

	if (!result.res) {
		embed = new client.userLib.discord.RichEmbed()
			.setColor('#00FF00')
			.setTitle(client.userLib.langf[msg.flag].warns)
			.setDescription(client.userLib.langf[msg.flag].warnsNo.replace("{member}", memberInfo.tag ? memberInfo.tag : memberInfo))
			.setTimestamp()
			.setFooter(memberInfo.tag ? memberInfo.tag : memberInfo, memberInfo.displayAvatarURL);
		msg.channel.send(embed);
		return;
	}

	embed = new client.userLib.discord.RichEmbed()
		.setColor('#FF0000')
		.setTitle(client.userLib.langf[msg.flag].warns)
		.setDescription(`${client.userLib.langf[msg.flag].warnsCount} **${result.res}**.`)
		.setTimestamp()
		.setFooter(memberInfo.tag ? memberInfo.tag : memberInfo, memberInfo.displayAvatarURL);

	msg.channel.send(embed);
}

module.exports.help = {
	tier: 0,
	args: 0
}