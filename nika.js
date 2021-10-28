import { Client, Intents, WebhookClient } from 'discord.js';
import log from './utils/log';
import DBLAPI from 'dblapi.js';
import readyEvent from './events/ready';
import presenceController from './utils/presenceController';
import postSDCStatistic from './utils/postSDCStatistic';

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
global.discordWebhook = new WebhookClient({ url: process.env.WEBHOOK_URL });

process.on('message', m => {
	if (m === 'startPresence') {
		presenceController();
		postSDCStatistic();
		setInterval(presenceController, 30e3);
		setInterval(postSDCStatistic, 30 * 60e3);
	}
});

const dbl = new DBLAPI(process.env.bdl, client);
dbl.on('posted', () => console.log('Server count posted!'));
dbl.on('error', e => console.log(`Oops! ${e}`));

client.once('ready', readyEvent);

client.login().then(() => log('Bot Authorized'));
