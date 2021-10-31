import db from '../services/db';
import texts from '../models/texts';
import getInvite from './getInvite';
import { MessageEmbed } from 'discord.js';
import colors from '../models/colors';
import log from './log';
import ignoreGuildsList from '../models/ignoreGuildsList';

const hasInvite = async (invite, guildId) => {
	if (!invite) return false;
	const fetchInvite = await discordClient.fetchInvite(invite).catch(() => null);
	return fetchInvite && fetchInvite.guild?.id !== guildId && !ignoreGuildsList.includes(fetchInvite.guild?.id);
};

export default async function (message) {
	if (message.author.bot || message.channel.type === 'dm') return;

	const [userWarns, guildSettings, guildMember] = await Promise.all([
		db.one('SELECT warns FROM blacklist WHERE id = ?', [message.author.id]),
		db.one('SELECT * FROM nika_server WHERE id = ?', [message.guild.id]),
		...(message.member ? [Promise.resolve(message.member)] : [message.guild.members.fetch(message.author.id)]),
	]);

	if (userWarns?.warns > 2 && (guildSettings.level === 'berserker' || guildSettings.level === 'medium'))
		guildMember.ban(texts[guildSettings.lang].banSpam).catch(() => {});

	if (
		message.channel.id === guildSettings.channel ||
		guildMember?.permissions.any([
			'ADMINISTRATOR',
			'MANAGE_ROLES',
			'MANAGE_MESSAGES',
			'KICK_MEMBERS',
			'BAN_MEMBERS',
			'VIEW_AUDIT_LOG',
			'MUTE_MEMBERS',
			'DEAFEN_MEMBERS',
			'MOVE_MEMBERS',
			'MANAGE_NICKNAMES',
		])
	)
		return;

	if (!(await hasInvite(getInvite(message.content), message.guild.id))) return;

	const embed = new MessageEmbed()
		.setAuthor('Обнаружена попытка спама!')
		.setTitle('Сообщение:')
		.setDescription(message.content)
		.setColor(colors.red)
		.addField('Нарушитель:', `${message.author.tag} (${message.author.id})`)
		.addField('Название канала:', `${message.channel.name} (${message.channel.id})`)
		.addField('Сервер:', `${message.guild.name} (${message.guild.id})`)
		.setFooter('Время сообщения')
		.setTimestamp(message.createdAt);

	if (process.env.WEBHOOK_URL)
		discordWebhook.send({ embeds: [embed] }).catch(() => log(`${message.author.id} | Не смогла отправить лог`));

	const newWarns = (userWarns?.warns ?? 0) + 1;

	await db.query(`INSERT INTO blacklist(id, type, warns) VALUES (?, 'user', ?) ON DUPLICATE KEY UPDATE warns = ?`, [
		message.author.id,
		newWarns,
		newWarns,
	]);

	if ((newWarns > 2 && guildSettings.level === 'medium') || guildSettings.level === 'berserker')
		guildMember.ban(texts[guildSettings.lang].banSpam).catch(() => {});

	const spammessage = await message.channel.send(
		texts[guildSettings.lang].msgNoInvitePubl.replace('%author', message.author)
	);
	setTimeout(() => spammessage.delete(), 1e4);
	message.author.send(texts[guildSettings.lang].msgNoInvite + newWarns).catch(() => {});
	message.delete().catch(() => {});
}
