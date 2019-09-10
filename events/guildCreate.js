module.exports = (client, guild) => {
	client.userLib.db.insert(`nika_server`, {id: guild.id, lang: guild.region == 'russia' ? 'ru' : 'en'}, () => {});
 	client.userLib.sendlog(`Новый сервер "${guild.name}" с ${guild.memberCount} человек`)
};