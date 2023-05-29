import Blacklist from '../models/blacklist.js';
import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';

/**
 *
 * @param cfg {{id: string, warns: number}}
 * @param res
 * @return {Promise<void>}
 */
export default async function ({ params: { entityId }, body: cfg }, res) {
	if (!cfg.id) throw new AppErrorMissing('id');
	if (cfg.id !== entityId) throw new AppErrorInvalid('id');
	if (!cfg.warns) throw new AppErrorMissing('warns');
	if (cfg.warns < 0) throw new AppErrorInvalid('warns');

	await Blacklist.update({ [cfg.id]: cfg }, null);
	res.end();
}
