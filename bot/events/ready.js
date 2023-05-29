import log from '../utils/log.js';
import guildDeleteEvent from './guildDelete.js';
import guildMemberAddEvent from './guildMemberAdd.js';
import messageCreateEvent from './messageCreate.js';
import messageUpdateEvent from './messageUpdate.js';
import interactionCreateEvent from './interactionCreate.js';

export default function () {
	discordClient.on('interactionCreate', interactionCreateEvent);

	discordClient.on('guildDelete', guildDeleteEvent);

	discordClient.on('guildMemberAdd', guildMemberAddEvent);

	discordClient.on('messageCreate', messageCreateEvent);
	discordClient.on('messageUpdate', messageUpdateEvent);

	log('Shard is ready!');
}
