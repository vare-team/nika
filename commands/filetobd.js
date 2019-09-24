var fs = require('fs');
var req = require('request');

module.exports.run = async (client, msg, args) => {

	if (!msg.attachments.first()) {
		msg.reply('attach file!');
		return;
	}

	let data = await client.userLib.promise(req, req.get, {url: msg.attachments.first().url, json: true});
	data = data.body.split("\r\n");

	console.log(data);

	for (var i of data) {
	  client.db.upsert('blacklist', {id: i, type: 'user', warns: '3'}, (err, affectedRows) => {});	
	}

	msg.reply('users add!');

}

module.exports.help = {
  tier: 1
}