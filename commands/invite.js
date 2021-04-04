module.exports.run = (client, msg, args) => {
  const embed = new client.userLib.discord.MessageEmbed()
	  .setAuthor(client.user.tag, client.user.displayAvatarURL())
	  .setTitle(client.userLib.langf[msg.flag].botInvite)
	  .setURL('https://discordapp.com/oauth2/authorize?client_id=543858333585506315&scope=bot&permissions=8')
	  .setColor("#15f153")

	msg.channel.send(embed);
}

module.exports.help = {
  tier: 0,
  args: 0
}