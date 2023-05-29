import Blacklist from '../models/blacklist.js';
import { AppErrorInvalid, AppErrorMissing } from '../utils/errors.js';

export default async function ({ query: { userId } }, res) {
	if (!userId) throw new AppErrorMissing('userId');
	if (userId.length <= 16 || userId.length > 20) throw new AppErrorInvalid('userId');

	const result = (await Blacklist.findByPk(userId)) ?? Blacklist.getDefault(userId);
	res.json(result);
}
