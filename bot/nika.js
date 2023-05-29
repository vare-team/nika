import { Client, GatewayIntentBits, WebhookClient } from 'discord.js';
import log from './utils/log.js';
import readyEvent from './events/ready.js';
import presenceController from './utils/presenceController.js';
import postStatistic from './utils/postStatistic.js';
import { parentPort } from 'worker_threads';
import { initializeDbModels } from './utils/db.js';

// ==== on server start functions
(async function initDb() {
	try {
		await initializeDbModels();
	} catch (e) {
		if (process.env.NODE_ENV !== 'test') {
			console.log(e);
			console.log('COULD NOT CONNECT TO THE DB, retrying in 5 seconds');
		}
		setTimeout(initDb, 5000);
	}
})();
// ====

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

global.discordClient = client;
if (process.env.WEBHOOK_URL) global.discordWebhook = new WebhookClient({ url: process.env.WEBHOOK_URL });

parentPort.on('message', m => {
	if (m === 'startPresence') {
		presenceController();
		postStatistic();
		setInterval(presenceController, 30e3);
		setInterval(postStatistic, 30 * 60e3);
	}
});

client.once('ready', readyEvent);

client.login().then(() => log('Bot Authorized'));
