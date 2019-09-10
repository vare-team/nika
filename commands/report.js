module.exports.run = (client, msg, args) => {

	let user = msg.mentions.users.first() || client.users.get(args[0]);
	if (!user) {
		msg.channel.send("Не могу найти данного пользователя.");
		return;
	}

	args.shift();
	let reason = args.join(' ');

	let embed = new client.userLib.discord.RichEmbed()
		.setAuthor("Репорт")
		.setColor("#15f153")
		.setTitle("Сообщение:")
		.setDescription(reason)
		.addField("Репорт на", `${user} (${user.id})`)
		.addField("Отправил", `${msg.author} (${msg.author.id})`)
		.addField("Название канала:", `${msg.channel.name} (${msg.channel.id})`)
		.addField("Сервер:", `${msg.guild.name} (${msg.guild.id})`)
		.setFooter("Время")
		.setTimestamp(msg.createdAt);

	msg.delete().catch(O_o=>{});
	msg.reply("Репорт был отправлен.");

	client.userLib.logc.send(embed);
}
 
module.exports.help = {
  tier: 0,
  args: 1
} 