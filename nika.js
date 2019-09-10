const Discord = require('discord.js')
		, client = new Discord.Client()
		, fs = require('fs')
		;

let con = require('mysql').createConnection({user: process.env.dblogin, password: process.env.dbpass, database: "discord", charset: "utf8mb4"});
con.on('error', (err) => {console.warn(err)});
con.connect(() => {client.userLib.sendlog(`{DB Connected} (ID:${con.threadId})`);});
let util = require('mysql-utilities');
util.upgrade(con);
util.introspection(con);

client.userLib = {};

client.userLib.discord = Discord;
client.userLib.db = con;
client.userLib.langf = require('./lang');
client.userLib.promise = require('/root/site/modules/promise');
client.userLib.presenseCount = 1;

client.userLib.logc = new Discord.WebhookClient("578886721941274625" ,"n57glScjqzPWTjdMLpDY-xor008M4jK26ps0pfuk6eRAb6r_gGDcxMcvp_tON9DdzZ37");

client.userLib.sendlog = (log) => {
	const now = new Date();
	console.log(`${('00' + now.getHours()).slice(-2) + ':' + ('00' + now.getMinutes()).slice(-2) + ':' + ('00' + now.getSeconds()).slice(-2)} | Shard[${client.shard.id}] : ${log}`);
};

client.userLib.presenseFunc = async () => {
	switch (client.userLib.presenseCount) {
		case 0:
		  client.user.setPresence({ game: { name: `за порядком | n.help`, type: 'WATCHING' }});
		  break;
		case 1:
			client.user.setPresence({ game: { name: `серверов: ${client.guilds.size} | n.help`, type: 'WATCHING' }});
			break;
		case 2:
			client.user.setPresence({ game: { name: `в ЧС: ${(await client.userLib.promise(client.userLib.db, client.userLib.db.queryValue, `SELECT COUNT(*) FROM blacklist WHERE type = 'user' AND warns > 2`)).res} | n.help`, type: 'WATCHING' }});
			break;
		case 3:
			client.user.setPresence({ game: { name: `n.help | n.info | n.invite`, type: 'LISTENING' }});
			client.userLib.presenseCount = 0;
			break;
	}
	client.userLib.presenseCount++;
};

con.queryKeyValue('SELECT id, tier FROM admins WHERE 1', (err, result) => client.userLib.admins = result);

client.userLib.isURL = (s) => {return /(https?:\/\/)?([\w.]+)\.([a-z]{2,6}.?)(\/[\w.])?/.test(s)}
client.userLib.isInvite = (s) => {return /(http(s|):\/\/|)discord\.gg\/\w+/.test(s) || /(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.test(s)}

client.userLib.inviteGuild = async (msg, id) => {
	let code = '';

	if (/(http(s|):\/\/|)discord\.gg\/\w+/.test(msg)) code = /(http(s|):\/\/|)discord\.gg\/\w+/.exec(msg)[0];
	if (/(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.test(msg)) code = /(http(s|):\/\/|)discordapp\.com\/invite\/\w+/.exec(msg)[0];

	let invite = await client.fetchInvite(code).catch(() => {return {guild: {id: 0}} });

	return invite.guild.id == id ? 1 : 0;
}

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
		, dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0Mzg1ODMzMzU4NTUwNjMxNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTUyMjM4OTkyfQ.GviW9wRBRDiVAwcdJfLte6NI1vp-fmfP38mmqyq6tN4', client);

dbl.on('posted', () => {
	console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
