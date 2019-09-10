module.exports.run = async(client, msg, args) => {

	let result = (await client.userLib.promise(client.userLib.db, client.userLib.db.query, 'SELECT date, channelName, msgContent, serverId FROM nikaLogs WHERE authorId = ? ORDER BY date', [args[0]])).res;
	let user = await client.fetchUser(args[0]);

	if (!result) {
		embed = new client.userLib.discord.RichEmbed().setColor('#00FF00').setAuthor(user.tag, user.avatarURL).setTitle('Предупреждения').setDescription(`Записей в логах не обнаружено.`).setTimestamp().setFooter(msg.author.tag, msg.author.avatarURL);
		msg.channel.send(embed);
		return;
	}

	embed = new client.userLib.discord.RichEmbed()
		.setColor('#FF0000')
		.setAuthor(user.tag, user.avatarURL)
		.setTimestamp();

	let x = 1;
	for (var i of result) {
		// embed.addField(`${i.date.getHours() < 10 ? `0${i.date.getHours()}`}:${i.date.getHours()}:${i.date.getMinutes() < 10 ? `0${i.date.getMinutes()}`}:${i.date.getMinutes()}:${i.date.getSeconds() < 10 ? `0${i.date.getSeconds()}`}:${i.date.getSeconds()}, ${i.date.getDate()}.${i.date.getMonth()+1 < 10 ? `0${i.date.getMonth()+1}`}:${i.date.getMonth()+1}.${i.date.getFullYear()}`, 'asd')
		embed.addField("Предупреждение #" + x, `Дата: \`\`${i.date}\`\`\nСервер: \`\`${client.guilds.get(i.serverId).name}\`\`\nКанал: \`\`#${i.channelName}\`\`\nСообщение: \`\`${i.msgContent}\`\``)
		x++;
	};

	msg.channel.send(embed);
}

module.exports.help = {
  tier: 2,
  args: 1
}