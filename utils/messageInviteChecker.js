import texts from '../config/texts.js';
import getInvite from './getInvite';
import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import colors from '../config/colors.js';
import log from './log';
import ignoreGuildsList from '../config/ignoreGuildsList.js';
import Blacklist from '../models/blacklist.js';
import Guild from '../models/guild.js';

const hasInvite = async (invite, guildId) => {
	if (!invite) return false;
	const fetchInvite = await discordClient.fetchInvite(invite).catch(() => null);
	return fetchInvite && fetchInvite.guild?.id !== guildId && !ignoreGuildsList.includes(fetchInvite.guild?.id);
};

export default async function (message) {
	if (message.author.bot || message.channel.type === 'DM') return;

	let [userWarns, guildSettings] = await Promise.all([
		Blacklist.findByPk(message.author.id),
		Guild.findByPk(message.guild.id),
	]);

	if (!guildSettings) {
		const language = message.guild.preferredLocale === 'ru' ? 'ru' : 'en';
		await Guild.create({ id: message.guild.id, language });
		guildSettings = { language, level: 'medium' };
	}

	if (!userWarns) userWarns = { warns: 0 };

	if (userWarns.warns > 2 && (guildSettings.level === 'berserker' || guildSettings.level === 'medium'))
		message.member.ban(texts[guildSettings.language].banSpam).catch(() => {});

	if (
		message.channel.id === guildSettings?.channel ||
		message.member?.permissions.any([
			PermissionFlagsBits.Administrator,
			PermissionFlagsBits.ManageRoles,
			PermissionFlagsBits.ManageMessages,
			PermissionFlagsBits.KickMembers,
			PermissionFlagsBits.BanMembers,
			PermissionFlagsBits.ViewAuditLog,
			PermissionFlagsBits.MuteMembers,
			PermissionFlagsBits.DeafenMembers,
			PermissionFlagsBits.MoveMembers,
			PermissionFlagsBits.ManageNicknames,
		])
	)
		return;

	if (!(await hasInvite(getInvite(message.content), message.guild.id))) return;

	if (process.env.WEBHOOK_URL) {
		const embed = new EmbedBuilder()
			.setAuthor({ name: 'Обнаружена попытка спама!' })
			.setTitle('Сообщение:')
			.setDescription(message.content)
			.setColor(colors.red)
			.addFields([
				{ name: 'Нарушитель:', value: `${message.author.tag} (${message.author.id})` },
				{ name: 'Название канала:', value: `${message.channel.name} (${message.channel.id})` },
				{ name: 'Сервер:', value: `${message.guild.name} (${message.guild.id})` },
			])
			.setFooter({ text: 'Время сообщения' })
			.setTimestamp(message.createdAt);

		discordWebhook.send({ embeds: [embed] }).catch(() => log(`${message.author.id} | Не смогла отправить лог`));
	}

	userWarns.warns++;

	await Blacklist.upsert({ id: message.author.id, warns: userWarns.warns });

	if ((userWarns.warns > 2 && guildSettings.level === 'medium') || guildSettings.level === 'berserker')
		message.member.ban(texts[guildSettings.language].banSpam).catch(() => {});

	const spammessage = await message.channel
		.send(texts[guildSettings.language].msgNoInvitePubl.replace('%author', message.author))
		.catch(() => {});

	if (spammessage) setTimeout(() => spammessage.delete().catch(() => {}), 1e4);
	message.author.send(texts[guildSettings.language].msgNoInvite + userWarns.warns).catch(() => {});
	message.delete().catch(() => {});
}
