var fs = require('fs');
var req = require('request');

module.exports.run = async (client, msg, args) => {
	msg.reply('in work.');

	if (!msg.attachments.first()) {
		msg.reply('attach file!');
		return;
	}

	let data = await client.userLib.promise(req, req.get, {url: msg.attachments.first().url, json: true});
	data = data.body.split("\n");

	console.log(data);

	// for(var i in array) {
	//   client.db.upsert('blacklist', {id: array[i], type: 'user', warns: '3'}, (err, affectedRows) => {});	
	// }

}

module.exports.help = {
  tier: 1
}