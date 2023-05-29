import Warn from '../models/warn.js';
import { AppErrorMissing } from '../utils/errors.js';

export default async function ({ params: { entityId } }, res) {
	if (!entityId) throw new AppErrorMissing('entityId');

	const result = await Warn.findByPk(entityId);
	res.json(result ?? Warn.getDefault(entityId));
}
