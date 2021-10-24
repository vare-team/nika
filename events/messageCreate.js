let check = require('./messageUpdate.js');

module.exports = async (client, msg) => {
	if (await check(client, msg, msg)) return;
};