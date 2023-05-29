import { request } from 'undici';

export default async function (config) {
	await request(`${process.env.API_URL}/blacklist`, config);
}
