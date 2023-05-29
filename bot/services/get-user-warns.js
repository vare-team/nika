import { request } from 'undici';
import Warns from '../models/Warns.js';

/**
 *
 * @param userId {string}
 * @return {Promise<Warns>}
 */
export default async function (userId) {
	const { body } = await request(`${process.env.API_URL}/warns/${userId}`);
	return new Warns(await body.json());
}
