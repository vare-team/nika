import db from '../services/db';
import texts from '../models/texts';
import isInvite from '../utils/getInvite';

export default async function (member) {
	if (member.user.bot) return;

	const [warns, guildSettings] = await Promise.all([
		db.one('SELECT warns FROM blacklist WHERE id = ? AND warns > 2', [member.id]),
		db.one('SELECT level, lang FROM nika_server WHERE id = ?', [member.guild.id]),
	]);

	if (warns && (guildSettings.level === 'berserker' || guildSettings.level === 'medium')) {
		member.ban(texts[guildSettings.lang].banSpam).catch(() => {});
		return;
	}

	if (!isInvite(member.user.username) || !member.guild.me?.permissions.has('MANAGE_NICKNAMES')) return;
	member.send(texts[guildSettings.lang].nickUrl);
	await member.setNickname('URL_in_Nickname');
}
