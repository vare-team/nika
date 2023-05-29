import Guild from '../models/guild.js';
import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';
import languages from '../configs/languages.js';

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

	const result = await Guild.findByPk(guildId);
	res.json(result ?? Guild.getDefault(language));
}
