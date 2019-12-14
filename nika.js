const Discord = require('discord.js')
		, client = new Discord.Client()
		, fs = require('fs')
		;

let con = require('mysql2').createConnection({user: process.env.dblogin, password: process.env.dbpass, database: "discord", charset: "utf8mb4"});
con.on('error', (err) => {console.warn(err)});
con.connect(() => {client.userLib.sendlog(`{DB Connected} (ID:${con.threadId})`);});
let util = require('mysql-utilities');
util.upgrade(con);
util.introspection(con);

client.userLib = {};

client.userLib.discord = Discord;
client.userLib.db = con;
client.userLib.langf = require('./lang');
client.userLib.promise = require('./promise');
client.userLib.request = require('request');
client.userLib.presenseCount = 1;

client.userLib.logc = new Discord.WebhookClient(process.env.whlogcchan, process.env.whlogctoken);

client.userLib.sendlog = (log) => {
	const now = new Date();
	console.log(`${('00' + now.getHours()).slice(-2) + ':' + ('00' + now.getMinutes()).slice(-2) + ':' + ('00' + now.getSeconds()).slice(-2)} | Shard[${client.shard.id}] : ${log}`);
};

client.userLib.presenseFunc = async () => {
	switch (client.userLib.presenseCount) {
		case 0:
		  await client.user.setPresence({game: {name: `за порядком | n.help`, type: 'WATCHING'}});
		  break;
		case 1:
			client.shard.fetchClientValues('guilds.size').then(results => {client.user.setPresence({ game: { name: `серверов: ${results.reduce((prev, val) => prev + val, 0)} | n.help`, type: 'WATCHING' }});});
			break;
		case 2:
			await client.user.setPresence({game: {name: `в ЧС: ${(await client.userLib.promise(client.userLib.db, client.userLib.db.queryValue, `SELECT COUNT(*) FROM blacklist WHERE type = 'user' AND warns > 2`)).res} | n.help`, type: 'WATCHING'}});
			break;
		case 3:
			await client.user.setPresence({game: {name: `n.help | n.info | n.invite`, type: 'LISTENING'}});
			client.userLib.presenseCount = 0;
			break;
	}
	client.userLib.presenseCount++;
};

con.queryKeyValue('SELECT id, tier FROM admins WHERE 1', (err, result) => client.userLib.admins = result);

client.userLib.isURL = (s) => {return /https?:\/\/.+\..{2,6}/.test(s)};
client.userLib.isInvite = (s) => {return /(http(s|):\/\/|)discord\.gg\/\w+/.test(s) || /(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.test(s)};

client.userLib.inviteGuild = async (msg, id) => {
	let code = '';

	if (/(http(s|):\/\/|)discord\.gg\/\w+/.test(msg)) code = /(http(s|):\/\/|)discord\.gg\/\w+/.exec(msg)[0];
	if (/(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.test(msg)) code = /(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.exec(msg)[0];

	let invite = await client.fetchInvite(code).catch(() => {return {guild: {id: 0}} });

	return invite.guild.id == id ? 1 : 0;
};

client.userLib.sendSDC = (servers, shards) => {
	client.userLib.request.post({url: 'https://api.server-discord.com/v2/bots/'+client.user.id+'/stats', form: {servers, shards}, headers: {'Authorization':'SDC '+process.env.sdc}});
	client.userLib.sendlog('{SDC} Send stats data');
};

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.filter(l => l.endsWith('.js')).forEach(file => {
		try {
			const event = require(`./events/${file}`);
			let eventName = file.split(".")[0];
			client.on(eventName, event.bind(null, client));
			delete require.cache[require.resolve(`./events/${file}`)];
		} catch (e) {console.warn(e)}
	});
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err);
	files.filter(l => l.endsWith('.js')).forEach(file => {
		try {
			let props = require(`./commands/${file}`);
			let commandName = file.split(".")[0];
			client.commands.set(commandName, props);
		} catch (e) {console.warn(e)}
	});
});

client.login(process.env.token);

const DBL = require("dblapi.js")
		, dbl = new DBL(process.env.bdl, client);

dbl.on('posted', () => {
	console.log('Server count posted!');
});

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
});
