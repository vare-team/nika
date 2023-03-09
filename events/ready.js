import log from '../utils/log';
import guildDeleteEvent from './guildDelete';
import guildMemberAddEvent from './guildMemberAdd';
import messageCreateEvent from './messageCreate';
import messageUpdateEvent from './messageUpdate';
import interactionCreateEvent from './interactionCreate';

export default function () {
	discordClient.on('interactionCreate', interactionCreateEvent);

	discordClient.on('guildDelete', guildDeleteEvent);

	discordClient.on('guildMemberAdd', guildMemberAddEvent);

	discordClient.on('messageCreate', messageCreateEvent);
	discordClient.on('messageUpdate', messageUpdateEvent);

	log('Shard is ready!');
}
