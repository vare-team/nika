import log from '../utils/log';
import guildCreateEvent from './guildCreate';
import guildDeleteEvent from './guildDelete';
import interactionCreateEvent from './interactionCreate';

export default function () {
	discordClient.on('interactionCreate', interactionCreateEvent);

	discordClient.on('guildCreate', guildCreateEvent);
	discordClient.on('guildDelete', guildDeleteEvent);

	discordClient.on('messageCreate', guildDeleteEvent);
	discordClient.on('messageUpdate', guildDeleteEvent);

	log('Shard is ready!');
}
