module.exports.run = (client, msg) => {
	let newsEmbed = new client.userLib.discord.RichEmbed()
	.setAuthor(client.userLib.langf[msg.flag].cmdList.replace('%author', client.user.tag), client.user.avatarURL)
	.setColor("#15f153")
	.addField(client.userLib.langf[msg.flag].cmd, client.userLib.langf[msg.flag].cmdMore.replace(/%prefix/g, 'n.'), true)
	.addField(client.userLib.langf[msg.flag].cmdAbout, client.userLib.langf[msg.flag].cmdAboutMore, true)
	.addField(client.userLib.langf[msg.flag].deffMode, client.userLib.langf[msg.flag].deffModeMore)
	.setFooter("With ❤ from server-discord.com")

	msg.channel.send(newsEmbed);
}
 
module.exports.help = {
	tier: 0,
	args: 0
}