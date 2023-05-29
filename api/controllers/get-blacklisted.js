import Warn from '../models/warn.js';
import { Op } from 'sequelize';

export default async function (req, res) {
	const count = await Warn.count({ where: { warns: { [Op.gt]: 2 } } });
	res.json({ count: count ?? 0 });
}
