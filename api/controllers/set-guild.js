import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';
import Guild from '../models/guild.js';

/**
 *
 * @param guildId {string}
 * @param cfg {{id: string, language: string, level: string, role: string, channel: string}}
 * @param res
 * @return {Promise<void>}
 */
export default async function ({ params: { guildId }, body: cfg }, res) {
	if (!cfg.id) throw new AppErrorMissing('id');
	if (cfg.id !== guildId) throw new AppErrorInvalid('id');

	await Guild.upsert(cfg);
	res.end();
}
