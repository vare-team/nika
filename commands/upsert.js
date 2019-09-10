exports.help = {
	tier: 1,
	args: 1
}

exports.run = (client, msg, args) => {
	client.userLib.db.upsert('blacklist', {id: args[0], type: args[1], warns: args[2]}, (err, affectedRows) => {
		console.dir({upsert:affectedRows}); 
		const embed = new client.userLib.discord.RichEmbed().setAuthor(`Успешно! Id: ${args[0]} добавлен/обновлен в базе!`, "https://cdn.discordapp.com/attachments/470556903718649856/470557142672343040/ping.png").setColor('#86FF00').setTimestamp().setFooter(msg.author.tag); 
		msg.reply({embed});
	});	
}