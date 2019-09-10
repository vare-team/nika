exports.help = {
	tier: 1,
	args: 1
}

exports.run = (client, msg, args) => {
	const guildid_rem = client.guilds.get(args[0]); guildid_rem.leave();
	client.db.delete('nika_server', {id: args[0]}, (err, affectedRows) => {
		console.dir({delete:affectedRows}); 
		const embed = new client.discord.RichEmbed().setAuthor(`Успешно! Сервер ${guildid_rem.name} удален!`, "https://cdn.discordapp.com/attachments/470556903718649856/470557142672343040/ping.png").setColor('#86FF00').setTimestamp().setFooter(msg.author.tag); 
		msg.reply({embed});
	});	
}