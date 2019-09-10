module.exports = async (client, oldmsg, newmsg) => {

	if(newmsg.author.bot || newmsg.channel.type == 'dm') return 1;

	let warns = await client.userLib.promise(client.userLib.db, client.userLib.db.queryValue, 'SELECT warns FROM blacklist WHERE id = ?', [newmsg.author.id]);
	warns = warns.res ? warns.res : 0;

	let res = (await client.userLib.promise(client.userLib.db, client.userLib.db.queryRow, 'SELECT * FROM nika_server WHERE id = ?', [newmsg.guild.id])).res;

	newmsg.flag = res.lang;

	if (!newmsg.member) newmsg.member = await newmsg.guild.fetchMember(newmsg.author);

	if (warns > 2 && (res.level == 'berserker' || res.level == 'medium')) newmsg.member.ban(client.userLib.langf[newmsg.flag].banSpam).catch(() => {});

	if (client.userLib.isInvite(newmsg.content) || (res.url && client.userLib.isURL(newmsg.content)) || newmsg.content.includes("privatepage.vip") || newmsg.content.includes("nakedphotos.club") || newmsg.content.includes("viewc.site")) {

		if (newmsg.channel.id == res.channel) return 1;

		if (newmsg.member && (newmsg.member.hasPermission('ADMINISTRATOR')
											 || newmsg.member.hasPermission('MANAGE_ROLES')
											 || newmsg.member.hasPermission('MANAGE_MESSAGES')
											 || newmsg.member.hasPermission('KICK_MEMBERS')
											 || newmsg.member.hasPermission('BAN_MEMBERS')
											 || newmsg.member.hasPermission('VIEW_AUDIT_LOG')
											 || newmsg.member.hasPermission('MUTE_MEMBERS')
											 || newmsg.member.hasPermission('DEAFEN_MEMBERS')
											 || newmsg.member.hasPermission('MOVE_MEMBERS')
											 || newmsg.member.hasPermission('MANAGE_NICKNAMES') )) return 1;

		if (newmsg.member && newmsg.member.roles.has(res.role)) return 1;

		if (client.userLib.isInvite(newmsg.content) && await client.userLib.inviteGuild(newmsg.content, newmsg.guild.id)) return 1;

		let embed = new client.userLib.discord.RichEmbed()
		.setAuthor('Обнаружена попытка спама!')
		.setTitle("Сообщение:")
		.setDescription(newmsg.content)
		.setColor("#FF0000")
		.addField("Нарушитель:", `${newmsg.author.tag} (${newmsg.author.id})`)
		.addField("Название канала:", `${newmsg.channel.name} (${newmsg.channel.id})`)
		.addField("Сервер:", `${newmsg.guild.name} (${newmsg.guild.id})`)
		.setFooter("Время")
		.setTimestamp(newmsg.createdAt);
		client.userLib.logc.send(embed).catch(() => client.userLib.logc.send('Не смогла отправить лог'));

		warns++;
		
		client.userLib.db.upsert('blacklist', {id: newmsg.author.id, type: 'user', warns: warns}, () => {});

		if ((warns > 2 && res.level == 'medium') || res.level == 'berserker') newmsg.member.ban(client.userLib.langf[newmsg.flag].banSpam).catch(() => {});

		newmsg.author.send(client.userLib.langf[newmsg.flag].msgNoInvite + warns).catch(() => {});
		newmsg.channel.send(client.userLib.langf[newmsg.flag].msgNoInvitePubl.replace('%author', newmsg.author)).then(newmsgd => newmsgd.delete(10000));
		newmsg.delete().catch(() => {});

		if (client.userLib.isInvite(newmsg.content)) client.userLib.db.insert('nikaLogs', {date: new Date(), msgId: newmsg.id, channelId: newmsg.channel.id, serverId: newmsg.guild.id, channelName: newmsg.channel.name, msgContent: newmsg.content, authorId: newmsg.author.id, authorName: newmsg.author.tag}, () => {});

		return 1;
	}

	return 0;
}