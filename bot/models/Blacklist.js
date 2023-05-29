export default class Blacklist {
	/**
	 *
	 * @param id {string}
	 * @param type {'user'}
	 * @param warns {number}
	 */
	constructor({ id, type, warns }) {
		this.id = id;
		this.type = type;
		this.warns = warns;
	}
}
