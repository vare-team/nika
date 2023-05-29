import Blacklist from '../models/blacklist.js';
import { Op } from 'sequelize';

export default async function (req, res) {
	const count = (await Blacklist.count({ where: { warns: { [Op.gt]: 2 } } })) ?? 0;
	res.json({ count });
}
