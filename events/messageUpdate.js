import texts from '../models/texts';
import db from '../services/db';
import { MessageEmbed } from 'discord.js';
import getInvite from '../utils/getInvite';
import log from '../utils/log';
import colors from '../models/colors';

const inviteGuild = async (msg, id) => {
	if (!msg) return true;
	const invite = await discordClient.fetchInvite(msg).catch(() => null);
	return !invite || invite.guild?.id === id;
};

export default async function (oldMsg, msg) {
	if (msg.author.bot || msg.channel.type === 'dm') return;

	const [userWarns, guildSettings, guildMember] = await Promise.all([
		db.one('SELECT warns FROM blacklist WHERE id = ?', [msg.author.id]),
		db.one('SELECT * FROM nika_server WHERE id = ?', [msg.guild.id]),
		...(msg.member ? [Promise.resolve(msg.member)] : [msg.guild.members.fetch(msg.author.id)]),
	]);

	if (userWarns.warns > 2 && (guildSettings.level === 'berserker' || guildSettings.level === 'medium'))
		guildMember.ban(texts[guildSettings.lang].banSpam).catch(() => {});

	if (
		msg.channel.id === guildSettings.channel ||
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

	if (await inviteGuild(getInvite(msg.content), msg.guild.id)) return;

	const embed = new MessageEmbed()
		.setAuthor('Обнаружена попытка спама!')
		.setTitle('Сообщение:')
		.setDescription(msg.content)
		.setColor(colors.red)
		.addField('Нарушитель:', `${msg.author.tag} (${msg.author.id})`)
		.addField('Название канала:', `${msg.channel.name} (${msg.channel.id})`)
		.addField('Сервер:', `${msg.guild.name} (${msg.guild.id})`)
		.setFooter('Время сообщения')
		.setTimestamp(msg.createdAt);

	discordWebhook.send({ embeds: [embed] }).catch(() => log(`${msg.author.id} | Не смогла отправить лог`));

	userWarns.warns++;

	await db.query(`INSERT INTO blacklist(id, type, warns) VALUES (?, 'user', ?) ON DUPLICATE KEY UPDATE warns = ?`, [
		msg.author.id,
		userWarns.warns,
		userWarns.warns,
	]);

	if ((userWarns.warns > 2 && guildSettings.level === 'medium') || guildSettings.level === 'berserker')
		guildMember.ban(texts[guildSettings.lang].banSpam).catch(() => {});

	const spamMsg = msg.channel.send(texts[guildSettings.lang].msgNoInvitePubl.replace('%author', msg.author));
	spamMsg.delete({ timeout: 10000 });
	msg.author.send(texts[guildSettings.lang].msgNoInvite + userWarns.warns).catch(() => {});
	msg.delete().catch(() => {});
}
