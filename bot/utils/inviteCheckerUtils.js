import getInvite from './getInvite.js';
import texts from '../config/texts.js';
import log from './log.js';
import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import colors from '../config/colors.js';
import ignoreGuildsList from '../config/ignoreGuildsList.js';

const hasInvite = async (invite, guildId) => {
	if (!invite) return false;
	const fetchInvite = await discordClient.fetchInvite(invite).catch(() => null);
	return fetchInvite && fetchInvite.guild?.id !== guildId && !ignoreGuildsList.includes(fetchInvite.guild?.id);
};

const permissionsWhiteList = [
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
	PermissionFlagsBits.ModerateMembers,
];

export async function isWhitelistedOrNoInvite(message, guildSettings) {
	return (
		message.channel.id === guildSettings?.channel ||
		message.member?.permissions.any(permissionsWhiteList) ||
		!(await hasInvite(getInvite(message.content), message.guild.id))
	);
}

/**
 *
 * @param warns {number}
 * @param guildSettings {Guild}
 * @param member {GuildMember}
 * @return {Promise<void>}
 */
export async function tryPunish(warns, guildSettings, member) {
	if ((warns > 0 && guildSettings.level === 'berserker') || (warns > 2 && guildSettings.level === 'medium')) {
		await member?.ban({ reason: texts[guildSettings.language].banSpam }).catch(() => {});
	}
}

export async function sendWebhook(message) {
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

		await discordWebhook.send({ embeds: [embed] }).catch(() => log(`${message.author.id} | Не смогла отправить лог`));
	}
}
