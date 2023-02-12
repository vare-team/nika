import Guild from '../models/guild.js';

export default async function (guild) {
	await Guild.create({ id: guild.id, language: guild.preferredLocale === 'ru' ? 'ru' : 'en' });
}
