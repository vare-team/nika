import setConfig from '../services/set-config.js';

/**
 *
 * @param config {Warns}
 * @return {Promise<void>}
 */
export default async function (config) {
	await setConfig('warns', config);
}
