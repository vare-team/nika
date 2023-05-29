import { request } from 'undici';
import Guilds from '../models/Guilds.js';

/**
 *
 * @param guildId {string}
 * @param language {string}
 * @return {Promise<Guilds>}
 */
export default async function (guildId, language) {
	const { body } = await request(`${process.env.API_URL}/guilds/${guildId}?language=${language}`);
	return new Guilds(await body.json());
}
