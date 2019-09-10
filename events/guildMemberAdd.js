module.exports = async (client, member) => {
	if (member.user.bot) return;

	let warns = await client.userLib.promise(client.userLib.db, client.userLib.db.count, 'SELECT warns FROM blacklist WHERE id = ? AND warns > 2', [member.id]);
  warns = warns.res ? warns.res : 0;

  let res = await client.userLib.promise(client.userLib.db, client.userLib.db.queryRow, 'SELECT level, lang FROM nika_server WHERE id = ?', [member.guild.id]);
  res = res.res;

  if (warns && (res.level == 'berserker' || res.level == 'medium')) {
  	member.ban(client.userLib.langf[res.lang].banSpam).catch(() => {});
  	return;
  }

	if (!client.userLib.isInvite(member.user.username) || !member.guild.member(client.user).hasPermission('MANAGE_NICKNAMES')) return;

  member.send(client.userLib.langf[res.lang].nickUrl)
  member.setNickname("Nick_URL");
};