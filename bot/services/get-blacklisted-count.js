import { request } from 'undici';

/**
 *
 * @return {Promise<number>}
 */
export default async function () {
	const { body } = await request(`${process.env.API_URL}/warns`);
	return (await body.json()).count;
}
