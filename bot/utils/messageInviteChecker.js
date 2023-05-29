import texts from '../config/texts.js';
import { isWhitelistedOrNoInvite, sendWebhook, tryPunish } from './inviteCheckerUtils.js';
import getGuildConfig from '../services/get-guild-config.js';
import Guild from '../models/Guild.js';
import getUserWarns from '../services/get-user-warns.js';
import setUserWarns from '../services/set-user-warns.js';

/**
 *
 * @param message {Message}
 * @return {Promise<void>}
 */
export default async function (message) {
	if (message.author.bot || !message.inGuild()) return;

	const [userWarns, guildSettings] = await Promise.all([
		await getUserWarns(message.author.id),
		getGuildConfig(message.guild.id.toString(), Guild.getLocale(message.guild.preferredLocale)),
	]);

	if (await isWhitelistedOrNoInvite(message, guildSettings)) return;

	userWarns.warns++;

	await setUserWarns(userWarns);
	await sendWebhook(message);
	await tryPunish(userWarns.warns, guildSettings, message.member);

	const spamMessage = await message.channel
		.send(texts[guildSettings.language].msgNoInvitePubl.replace('%author', message.author.toString()))
		.catch(() => {});

	if (spamMessage) setTimeout(() => spamMessage.delete().catch(() => {}), 1e4);

	await message.author.send(texts[guildSettings.language].msgNoInvite + userWarns.warns).catch(() => {});
	await message.delete().catch(() => {});
}
