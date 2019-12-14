let check = require('./messageUpdate.js');

let  checkPerm = (admins, tier, ownerID, member) => {
	if (admins.hasOwnProperty(member.id) && admins[member.id] == 0) return true;
	if (admins.hasOwnProperty(member.id) && tier > 0 && tier > admins[member.id]) return true;
	if (tier == -3 && (ownerID == member.id)) return true;
	if (tier == -2 && member.hasPermission('ADMINISTRATOR')) return true;
	return tier == -1 && member.hasPermission('MANAGE_MESSAGES');
};

module.exports = async (client, msg) => {
	if (await check(client, msg, msg)) return;

	if(!msg.content.toLowerCase().startsWith('n.')) return;

	const [command, ...args] = msg.content.slice(2).trim().split(/ +/g);
	const cmd = client.commands.get(command.toLowerCase());
	if (!cmd) return;

	if (cmd.help.tier && !checkPerm(client.userLib.admins, cmd.help.tier, msg.guild.ownerID, msg.member)) {
		// msg.reply(client.userLib.langf[msg.flag].errPerm);
		return;
	}

	if (cmd.help.args && !args.length) {
		msg.reply(client.userLib.langf[msg.flag].errArgs);
		return;
	}

	if (!msg.channel.permissionsFor(client.user).has("EMBED_LINKS")) {
		msg.reply(client.userLib.langf[msg.flag].errEmbed);
		return;
	}

	cmd.run(client, msg, args);
};

/* 
	flag
	
	-3 - Owner guild
	-2 - Admin guild
	-1 - Moderator guild
	 0 - user
	 1 - admin tier 0
	 2 - admin tier 1
*/