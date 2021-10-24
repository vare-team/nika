import texts from '../models/texts';

const isURL = string => {
	return /https?:\/\/.+\..{2,6}/.test(string);
};
const isInvite = string => {
	return (
		/(http(s|):\/\/|)discord\.gg\/\w+/.test(string) ||
		/(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.test(string) ||
		/(http(s|):\/\/|)discord\.com\/invite\/\w+/.test(string)
	);
};

const inviteGuild = async (msg, id) => {
	let code = '';

	if (/(http(s|):\/\/|)discord\.gg\/\w+/.test(msg)) code = /(http(s|):\/\/|)discord\.gg\/\w+/.exec(msg)[0];
	if (/(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.test(msg))
		code = /(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.exec(msg)[0];

	let invite = await client.fetchInvite(code).catch(() => {
		return { guild: { id: 0 } };
	});

	return invite.guild.id == id ? 1 : 0;
};

export default async function (message) {
	if (message.author.bot || message.channel.type == 'dm') return;

	let userWarns = await client.userLib.promise(
		client.userLib.db,
		client.userLib.db.queryValue,
		'SELECT warns FROM blacklist WHERE id = ?',
		[message.author.id]
	);
	userWarns = userWarns.res ? userWarns.res : 0;

	let guildSettings = await client.userLib.promise(
		client.userLib.db,
		client.userLib.db.queryRow,
		'SELECT * FROM nika_server WHERE id = ?',
		[message.guild.id]
	);
	guildSettings = guildSettings.res;

	const localLanguage = guildSettings.lang;
	const localBanLevel = guildSettings.level;

	if (!message.member) await message.guild.members.fetch(message.author);
	if (userWarns > 2 && (localBanLevel === 'berserker' || localBanLevel === 'medium'))
		message.member.ban(texts[localLanguage].banSpam).catch(() => {});

	if (isInvite(newmsg.content)) {
		if (newmsg.channel.id == res.channel) return 1;
		if (
			newmsg.member &&
			(newmsg.member.hasPermission('ADMINISTRATOR') ||
				newmsg.member.hasPermission('MANAGE_ROLES') ||
				newmsg.member.hasPermission('MANAGE_MESSAGES') ||
				newmsg.member.hasPermission('KICK_MEMBERS') ||
				newmsg.member.hasPermission('BAN_MEMBERS') ||
				newmsg.member.hasPermission('VIEW_AUDIT_LOG') ||
				newmsg.member.hasPermission('MUTE_MEMBERS') ||
				newmsg.member.hasPermission('DEAFEN_MEMBERS') ||
				newmsg.member.hasPermission('MOVE_MEMBERS') ||
				newmsg.member.hasPermission('MANAGE_NICKNAMES'))
		)
			return 1;
		// if (newmsg.member && newmsg.member.roles.cache.has(res.role)) return 1;
		if (isInvite(newmsg.content) && (await inviteGuild(newmsg.content, newmsg.guild.id)))
			return 1;

		let embed = new client.userLib.discord.MessageEmbed()
			.setAuthor('Обнаружена попытка спама!')
			.setTitle('Сообщение:')
			.setDescription(newmsg.content)
			.setColor('#FF0000')
			.addField('Нарушитель:', `${newmsg.author.tag} (${newmsg.author.id})`)
			.addField('Название канала:', `${newmsg.channel.name} (${newmsg.channel.id})`)
			.addField('Сервер:', `${newmsg.guild.name} (${newmsg.guild.id})`)
			.setFooter('Время')
			.setTimestamp(newmsg.createdAt);
		client.userLib.logc.send(embed).catch(() => client.userLib.logc.send('Не смогла отправить лог'));

		warns++;

		client.userLib.db.upsert('blacklist', { id: newmsg.author.id, type: 'user', warns: warns }, () => {});

		if ((warns > 2 && res.level == 'medium') || res.level == 'berserker')
			newmsg.member.ban(texts[localLanguage].banSpam).catch(() => {});

		newmsg.author.send(texts[localLanguage].msgNoInvite + warns).catch(() => {});
		newmsg.channel
			.send(texts[localLanguage].msgNoInvitePubl.replace('%author', newmsg.author))
			.then(newmsgd => newmsgd.delete({ timeout: 10000 }));
		newmsg.delete().catch(() => {});

		return 1;
	}

	return 0;
}
