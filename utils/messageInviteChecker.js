import texts from '../config/texts.js';
import Blacklist from '../models/blacklist.js';
import Guild from '../models/guild.js';
import { isWhitelistedOrNoInvite, sendWebhook, tryPunish } from './inviteCheckerUtils.js';

/**
 *
 * @param message {Message}
 * @return {Promise<void>}
 */
export default async function (message) {
	if (message.author.bot || !message.inGuild()) return;

	let [userWarns, guildSettings] = await Promise.all([
		Blacklist.findByPk(message.author.id),
		Guild.findByPk(message.guild.id),
	]);

	guildSettings ??= Guild.getDefault(Guild.getLocale(message.guild.preferredLocale));
	userWarns ??= Blacklist.getDefault(message.author.id);

	if (await isWhitelistedOrNoInvite(message, guildSettings)) return;

	userWarns.warns++;

	await Blacklist.upsert({ id: message.author.id, warns: userWarns.warns }).catch(() => {});
	await sendWebhook(message);
	await tryPunish(userWarns.warns, guildSettings, message.member);

	const spamMessage = await message.channel
		.send(texts[guildSettings.language].msgNoInvitePubl.replace('%author', message.author.toString()))
		.catch(() => {});

	if (spamMessage) setTimeout(() => spamMessage.delete().catch(() => {}), 1e4);

	await message.author.send(texts[guildSettings.language].msgNoInvite + userWarns.warns).catch(() => {});
	await message.delete().catch(() => {});
}
