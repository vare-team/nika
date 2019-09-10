module.exports = (client) => {
	setInterval(client.userLib.presenseFunc, 30000);
	client.userLib.sendlog(`{READY}`);
};