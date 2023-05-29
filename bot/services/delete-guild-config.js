import { request } from 'undici';

export default async function (guildId) {
	await request(`${process.env.API_URL}/guild?guildId=${guildId}`, { method: 'DELETE' });
}
