import texts from '../config/texts.js';
import isInvite from '../utils/getInvite';
import Blacklist from '../models/blacklist.js';
import { Op } from 'sequelize';
import Guild from '../models/guild.js';

export default async function (member) {
	if (member.user.bot) return;

	const [warns, guildSettings] = await Promise.all([
		Blacklist.findOne({ where: { id: member.id, warns: { [Op.gt]: 2 } } }),
		Guild.findByPk(member.guild.id),
	]);

	if (warns && (guildSettings.level === 'berserker' || guildSettings.level === 'medium')) {
		member.ban(texts[guildSettings.language].banSpam).catch(() => {});
		return;
	}

	if (!isInvite(member.user.username) || !member.guild.me?.permissions.has('MANAGE_NICKNAMES')) return;
	member.send(texts[guildSettings.language].nickUrl);
	await member.setNickname('URL_in_Nickname');
}
