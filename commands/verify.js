exports.help = {
	tier: 3,
	args: 0
}

function status(tier, stat = '') {
	switch (tier) {
		case 0: stat = 'администратором'; break;
		case 1: stat = 'сотрудником'; break;
		case 2: stat = 'помощником'; break;
		default: stat = 'участником команды'; break;
	}
	return stat;
}

exports.run = (client, msg) => {

	let user = msg.mentions.users.first() ? msg.mentions.users.first() : msg.author; 

	let embed = new client.userLib.discord.RichEmbed().setAuthor(`${user.tag} ${Object.keys(client.userLib.admins).indexOf(user.id) == -1 ? 'НЕ ' : ''}является ${status(client.userLib.admins[user.id])} Server-Discord.com!`, user.avatarURL).setColor('#FF0000').setTimestamp().setFooter(`Валидация администрации Server-Discord.com`, client.user.avatarURL);
	msg.channel.send({embed});
}