import { request } from 'undici';
import Guild from '../models/Guild.js';

/**
 *
 * @param guildId {string}
 * @param language {string}
 * @return {Promise<Guild>}
 */
export default async function (guildId, language) {
	const { body } = await request(`${process.env.API_URL}/guild?guildId=${guildId}&language=${language}`);
	return new Guild(await body.json());
}
