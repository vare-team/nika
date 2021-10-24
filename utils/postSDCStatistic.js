import axios from 'axios';
import sendLog from '../utils/log';

export default function (servers, shards) {
	axios({
		method: 'POST',
		url: 'https://api.server-discord.com/v2/bots/' + discordClient.user.id + '/stats',
		data: { servers, shards },
		headers: { authorization: 'SDC ' + process.env.sdc },
	});
	sendLog('{SDC} Send stats data.');
}
