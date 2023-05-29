import Guild from '../models/guild.js';
import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';

/**
 *
 * @param guildId {string}
 * @param language {string}
 * @param res
 * @return {Promise<void>}
 */
export default async function ({ params: { guildId }, query: { language } }, res) {
	if (!guildId) throw new AppErrorMissing('guildId');
	if (!language) throw new AppErrorMissing('language');
	if (!languages.includes(language)) throw new AppErrorInvalid('language');

	if (guildId.length <= 16 || guildId.length > 20) throw new AppErrorInvalid('guildId');
	if (language.length <= 2) throw new AppErrorInvalid('language');

	const result = (await Guild.findByPk(guildId)) ?? Guild.getDefault(language);
	res.json(result);
}
