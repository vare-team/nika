import setConfig from '../services/set-config.js';

/**
 *
 * @param config {Guilds}
 * @return {Promise<void>}
 */
export default async function (config) {
	await setConfig('guilds', config);
}
