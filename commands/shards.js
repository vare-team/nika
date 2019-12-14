exports.help = {
	tier: 2,
	args: 0
}

exports.run = async(client, msg, args) => {

  let embed = new client.userLib.discord.RichEmbed()
  .setAuthor('Nika Bot', 'https://cdn.discordapp.com/attachments/551423855298871346/598919974744227860/sdc_logo_serv.png', 'https://server-discord.com')
  // .setFooter(`Шард сервера: ${client.userLib.shardName[client.shard.id]}`)
  .setFooter(`Шард сервера: ${client.shard.id}`)
  .setColor('#7289DA');

  let guilds = await client.shard.fetchClientValues('guilds.size');
  let users = await client.shard.fetchClientValues('users.size');
  let channels = await client.shard.fetchClientValues('channels.size');
  let pings = await client.shard.fetchClientValues('ping');

  for (var i = 0, length = client.shard.count; i < length; i++) {
    // embed.addField(`${i+1}. ${client.userLib.shardName[i]} ${i == client.shard.id ? '←' : ''}`, `Серверов: \`\`${guilds[i]}\`\`, Пользователи: \`\`${users[i]}\`\`, Каналы: \`\`${channels[i]}\`\`, Пинг: \`\`${Math.floor(pings[i])}мс\`\``);
    embed.addField(`${i+1}. ${i} ${i == client.shard.id ? '←' : ''}`, `Серверов: \`\`${guilds[i]}\`\`, Пользователи: \`\`${users[i]}\`\`, Каналы: \`\`${channels[i]}\`\`, Пинг: \`\`${Math.floor(pings[i])}мс\`\``);
  };

  embed.addBlankField();
  embed.addField(`Всего: ${client.shard.count}`, `Серверов: \`\`${guilds.reduce((prev, val) => prev + val, 0)}\`\`, Пользователи: \`\`${users.reduce((prev, val) => prev + val, 0)}\`\`, Каналы: \`\`${channels.reduce((prev, val) => prev + val, 0)}\`\``);

  msg.channel.send(embed);

}