/**
 * Return invite
 * @param {string} msg
 * @returns {string|null}
 */
export default msg =>
	(/(http(s|):\/\/|)discord\.gg\/\w+/.exec(msg) ||
		/(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.exec(msg) ||
		/(http(s|):\/\/|)discord\.com\/invite\/\w+/.exec(msg) || [null])[0];
