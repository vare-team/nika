import Blacklist from '../models/blacklist.js';
import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';

/**
 *
 * @param cfg {{id: string, warns: number}}
 * @param res
 * @return {Promise<void>}
 */
export default async function ({ body: cfg }, res) {
	if (!cfg.id) throw new AppErrorMissing('id');
	if (!cfg.warns) throw new AppErrorMissing('warns');
	if (cfg.id.length <= 16 || cfg.id.length > 20) throw new AppErrorInvalid('id');
	if (cfg.warns < 0) throw new AppErrorInvalid('warns');

	await Blacklist.update({ [cfg.id]: cfg }, null);
	res.end();
}
