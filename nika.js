import { Client, GatewayIntentBits, WebhookClient } from 'discord.js';
import log from './utils/log';
import readyEvent from './events/ready';
import presenceController from './utils/presenceController';
import postStatistic from './utils/postStatistic';
import { parentPort } from 'worker_threads';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMessages,
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
