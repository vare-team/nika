module.exports = (client, guild) => {
	client.userLib.db.delete('nika_server', {id: guild.id}, (o_0) => {});
 	client.userLib.sendlog(`Бот вышел с "${guild.name}"`)
};