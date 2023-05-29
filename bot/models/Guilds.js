export default class Guilds {
	/**
	 *
	 * @param id {string}
	 * @param language {string}
	 * @param level {string | 'medium'}
	 * @param role {string}
	 * @param channel {string}
	 */
	constructor({ id, language, level, role, channel }) {
		this.id = id;
		this.language = language;
		this.level = level;
		this.role = role;
		this.channel = channel;
	}

	static getLocale(language) {
		return language === 'ru' ? 'ru' : 'en';
	}
}
