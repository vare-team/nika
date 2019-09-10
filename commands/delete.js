exports.run = (client, msg, args) => {
	client.userLib.db.delete('blacklist', {id: args[0]}, (err, affectedRows) => {
		console.dir({delete:affectedRows}); 
		const embed = new client.userLib.discord.RichEmbed().setColor('#86FF00').setTimestamp().setFooter(msg.author.tag)
			.setAuthor(`Успешно! Id: ${args[0]} удален из базы!`, "https://cdn.discordapp.com/attachments/470556903718649856/470557142672343040/ping.png"); 
		msg.reply(embed);
	});	
}

exports.help = {
	tier: 1,
	args: 1
}