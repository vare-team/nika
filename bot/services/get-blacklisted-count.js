import { request } from 'undici';

/**
 *
 * @return {Promise<number>}
 */
export default async function () {
	const { body } = await request(`${process.envAPI_URL}/blacklist/count`);
	return (await body.json()).count;
}
