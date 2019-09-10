module.exports.run = (client, msg, args) => {

	msg.channel.fetchMessage(args[0])
	.then(message => {

		msg.guild.ban(message.member, {reason: `Репорт. Был отправлен админом ${msg.author.tag}`});

		let embed = new client.userLib.discord.RichEmbed()
			.setAuthor("Репорт")
			.setColor("#15f153")
			.setTitle('Сообщение')
			.setDescription(message.content)
			.addField("Репорт на", `${message.author} (${message.author.id})`)
			.addField("Отправил", `${msg.author} (${msg.author.id})`)
			.addField("Название канала:", `${msg.channel.name} (${msg.channel.id})`)
			.addField("Сервер:", `${msg.guild.name} (${msg.guild.id})`)
			.setFooter("Время")
			.setTimestamp(msg.createdAt);

		msg.reply("Репорт был отправлен, а пользователь отправлен в бан!");

		client.userLib.logc.send(embed);

		message.delete();

	})
	.catch(err => {
		console.log(err); 
		msg.reply('Не могу найти сообщение с таким ID!');
	})
};
 
module.exports.help = {
	tier: -2,
	args: 1
}