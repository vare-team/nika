import deleteGuildConfig from '../services/delete-guild-config.js';

export default async function (guild) {
	await deleteGuildConfig(guild);
}
