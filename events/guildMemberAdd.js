import texts from '../config/texts.js';
import isInvite from '../utils/getInvite';
import Blacklist from '../models/blacklist.js';
import { Op } from 'sequelize';
import Guild from '../models/guild.js';
import { PermissionFlagsBits } from 'discord.js';
import { tryPunish } from '../utils/inviteCheckerUtils.js';

export default async function (member) {
	if (member.user.bot) return;

	let [warns, guildSettings] = await Promise.all([
		Blacklist.findOne({ where: { id: member.id, warns: { [Op.gt]: 2 } } }),
		Guild.findByPk(member.guild.id),
	]);

	warns ??= Blacklist.getDefault(member.id);
	guildSettings ??= Guild.getDefault(Guild.getLocale(member.guild?.preferredLocale));

	await tryPunish(warns.warns, guildSettings, member);

	if (!isInvite(member.user.username) || !member.guild.me?.permissions.has(PermissionFlagsBits.ManageNicknames)) return;
	member.send(texts[guildSettings.language].nickUrl);
	await member.setNickname('URL_in_Nickname');
}
