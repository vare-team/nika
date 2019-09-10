module.exports.run = (client, msg, args) => {

  let user = msg.mentions.users.first() || client.users.get(args[0]);
  if (!user) {
  	msg.channel.send("Не могу найти данного пользователя.").then(msgd => msgd.delete(3000));
  	return;
  }
  
  args.shift();
  let reason = args.join(' ');

  if (!reason.length) {
  	msg.channel.send("Нет ответа.").then(msgd => msgd.delete(2000));
  	return;
  }
  
  user.send(reason);
}

module.exports.help = {
  tier: 1,
  args: 1
}