import { Client, Intents, WebhookClient } from 'discord.js';
import log from './utils/log';
import DBLAPI from 'dblapi.js';
import readyEvent from './events/ready';
import presenceController from './utils/presenceController';
import postSDCStatistic from './utils/postSDCStatistic';
import { parentPort } from 'worker_threads';

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_MESSAGES,
	],
});

global.discordClient = client;
if (process.env.WEBHOOK_URL) global.discordWebhook = new WebhookClient({ url: process.env.WEBHOOK_URL });

parentPort.on('message', m => {
	if (m === 'startPresence') {
		presenceController();
		postSDCStatistic();
		setInterval(presenceController, 30e3);
		setInterval(postSDCStatistic, 30 * 60e3);
	}
});

if (process.env.DBL) {
	const dbl = new DBLAPI(process.env.DBL, client);
	dbl.on('posted', () => console.log('Server count posted!'));
	dbl.on('error', e => console.log(`Oops! ${e}`));
}

client.once('ready', readyEvent);

client.login().then(() => log('Bot Authorized'));
