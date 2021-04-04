module.exports.run = (client, msg) => {
	let newsEmbed = new client.userLib.discord.MessageEmbed()
	.setAuthor(client.userLib.langf[msg.flag].cmdList.replace('%author', client.user.tag), client.user.displayAvatarURL())
	.setColor("#15f153")
	.addField(client.userLib.langf[msg.flag].cmd, client.userLib.langf[msg.flag].cmdMore.replace(/%prefix/g, 'n.'), true)
	.addField(client.userLib.langf[msg.flag].cmdAbout, client.userLib.langf[msg.flag].cmdAboutMore, true)
	.addField(client.userLib.langf[msg.flag].deffMode, client.userLib.langf[msg.flag].deffModeMore)

	msg.channel.send(newsEmbed);
}
 
module.exports.help = {
	tier: 0,
	args: 0
}