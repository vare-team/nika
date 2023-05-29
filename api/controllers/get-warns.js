import Blacklist from '../models/blacklist.js';
import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';

export default async function ({ params: { entityId } }, res) {
	if (!entityId) throw new AppErrorMissing('entityId');

	const result = (await Blacklist.findByPk(userId)) ?? Blacklist.getDefault(userId);
	res.json(result);
}
