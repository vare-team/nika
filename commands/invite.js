module.exports.run = (client, msg, args) => {

  let newsEmbed = new client.userLib.discord.RichEmbed()
  .setAuthor(client.user.tag, client.user.avatarURL)
  .setTitle(client.userLib.langf[msg.flag].botInvite)
  .setURL('https://discordapp.com/oauth2/authorize?client_id=543858333585506315&scope=bot&permissions=8')
  .setColor("#15f153")
  .setFooter("With ❤ from server-discord.com")
	msg.channel.send(newsEmbed);
}

module.exports.help = {
  tier: 0,
  args: 0
}