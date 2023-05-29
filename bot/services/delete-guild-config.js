import { request } from 'undici';

/**
 *
 * @param guildId {string}
 * @return {Promise<void>}
 */
export default async function (guildId) {
	await request(`${process.env.API_URL}/guilds/${guildId}`, { method: 'DELETE' });
}
