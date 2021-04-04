module.exports.run = async (client, msg, args) => {

	let object;
	if (/([0-9]){17,18}/.test(args[0])) object = await client.users.fetch(args[0]).catch(() => 0);


	let memberInfo = msg.mentions.users.first() || object || msg.author;

	let result = await client.userLib.promise(client.userLib.db, client.userLib.db.queryValue, 'SELECT warns FROM blacklist WHERE id = ?', [memberInfo.id]);

	if (!result.res) {
		let embed = new client.userLib.discord.MessageEmbed()
			.setColor('#00FF00')
			.setTitle(client.userLib.langf[msg.flag].warns)
			.setDescription(client.userLib.langf[msg.flag].warnsNo.replace("{member}", memberInfo.tag))
			.setTimestamp()
			.setFooter(memberInfo.tag, memberInfo.displayAvatarURL());
		msg.channel.send(embed);
		return;
	}

	let embed = new client.userLib.discord.MessageEmbed()
		.setColor('#FF0000')
		.setTitle(client.userLib.langf[msg.flag].warns)
		.setDescription(`${client.userLib.langf[msg.flag].warnsCount} **${result.res}**.`)
		.setTimestamp()
		.setFooter(memberInfo.tag, memberInfo.displayAvatarURL());

	msg.channel.send(embed);
}

module.exports.help = {
	tier: 0,
	args: 0
}
