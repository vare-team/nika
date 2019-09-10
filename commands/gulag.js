exports.help = {
	tier: 1,
	args: 1
}

exports.run = (client, msg, args) => {
	client.userLib.db.upsert('blacklist', {id: msg.mentions.users.first().id || args[0], type: 'user', warns: 3}, (err, affectedRows) => {
		console.dir({upsert:affectedRows});
		const embed = new client.userLib.discord.RichEmbed().setTitle(`Успешно!`).setDescription(`${msg.mentions.users.first() || args[0]} ОТПРАВЛЕН В ГУЛАГ ИСПРАВЛЕНИЯ!`).setColor('#86FF00').setTimestamp().setFooter(msg.author.tag); 
		msg.reply(embed);
	});	
}