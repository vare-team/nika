import texts from '../config/texts.js';
import { ChannelType } from 'discord.js';
import Blacklist from '../models/blacklist.js';
import Guild from '../models/guild.js';
import { isWhitelistedOrNoInvite, sendWebhook, tryPunish } from './inviteCheckerUtils.js';

export default async function (message) {
	if (message.author.bot || message.channel.type === ChannelType.DM) return;

	let [userWarns, guildSettings] = await Promise.all([
		Blacklist.findByPk(message.author.id),
		Guild.findByPk(message.guild.id),
	]);

	if (!guildSettings) {
		const language = message.guild.preferredLocale === 'ru' ? 'ru' : 'en';
		guildSettings = { language, level: 'medium' };
	}
	if (!userWarns) userWarns = { warns: 0 };

	await tryPunish(userWarns, guildSettings, message);

	if (await isWhitelistedOrNoInvite(message, guildSettings)) return;

	userWarns.warns++;

	await Blacklist.upsert({ id: message.author.id, warns: userWarns.warns }).catch(() => {});
	await sendWebhook(message);
	await tryPunish(userWarns, guildSettings, message);

	const spamMessage = await message.channel
		.send(texts[guildSettings.language].msgNoInvitePubl.replace('%author', message.author))
		.catch(() => {});

	if (spamMessage) setTimeout(() => spamMessage.delete().catch(() => {}), 1e4);

	await message.author.send(texts[guildSettings.language].msgNoInvite + userWarns.warns).catch(() => {});
	await message.delete().catch(() => {});
}
