import texts from '../config/texts.js';
import isInvite from '../utils/getInvite.js';
import { PermissionFlagsBits } from 'discord.js';
import { tryPunish } from '../utils/inviteCheckerUtils.js';
import getUserWarns from '../services/get-user-warns.js';
import getGuildConfig from '../services/get-guild-config.js';
import Guild from '../models/Guild.js';

export default async function (member) {
	if (member.user.bot) return;

	const [warns, guildSettings] = await Promise.all([
		await getUserWarns(member.id),
		await getGuildConfig(member.guild.id, Guild.getLocale(member.guild?.preferredLocale)),
	]);

	await tryPunish(warns.warns, guildSettings, member);

	if (!isInvite(member.user.username) || !member.guild.me?.permissions.has(PermissionFlagsBits.ManageNicknames)) return;
	member.send(texts[guildSettings.language].nickUrl);
	await member.setNickname('URL_in_Nickname');
}
