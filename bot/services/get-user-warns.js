import { request } from 'undici';
import Blacklist from '../models/Blacklist.js';

export default async function (userId) {
	const { body } = await request(`${process.env.API_URL}/blacklist?userId=${userId}`);
	return new Blacklist(await body.json());
}
