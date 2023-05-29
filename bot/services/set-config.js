import { request } from 'undici';

/**
 *
 * @param path {string}
 * @param config {Guilds | Warns}
 * @return {Promise<void>}
 */
export default async function (path, config) {
	await request(`${process.env.API_URL}/${path}/${config.id}`, {
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(config),
	});
}
